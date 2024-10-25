"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const crypto_service_1 = require("../crypto/crypto.service");
const common_2 = require("../common");
const config_1 = require("../config");
const typeorm_1 = require("@nestjs/typeorm");
const coin_entity_1 = require("../coin/entities/coin.entity");
const typeorm_2 = require("typeorm");
const email_service_1 = require("../email/email.service");
const config_2 = require("@nestjs/config");
const coin_price_entity_1 = require("../coin/entities/coin.price.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
const alertTemplate_1 = require("../static/alertTemplate");
const priceIncreaseTemplate_1 = require("../static/priceIncreaseTemplate");
let TaskService = TaskService_1 = class TaskService {
    constructor(CoinRepository, CoinPriceRepository, AlertRepository, cryptoService, emailService, configService) {
        this.CoinRepository = CoinRepository;
        this.CoinPriceRepository = CoinPriceRepository;
        this.AlertRepository = AlertRepository;
        this.cryptoService = cryptoService;
        this.emailService = emailService;
        this.configService = configService;
        this.logger = new common_1.Logger(TaskService_1.name);
    }
    async checkIncreaseByPercentageInHours(coinName, hours, percentage) {
        const deltaDate = new Date();
        deltaDate.setHours(deltaDate.getHours() - hours);
        const result = await this.CoinPriceRepository.find({
            where: {
                coin: {
                    symbol: coinName,
                },
            },
            order: { createdAt: 'DESC' },
            relations: { coin: true },
            take: 2,
        });
        const [coinPriceNow, coinOneHourAgo] = result;
        this.logger.log(`previousPrice: ${coinOneHourAgo?.priceUSD},previousPrice: ${coinPriceNow}, percentageIncrease:${percentage}`);
        return {
            generateAlert: (0, common_2.checkIncreaseFromPercentage)(coinOneHourAgo?.priceUSD, coinPriceNow?.priceUSD, percentage),
            previousPrice: coinOneHourAgo?.priceUSD,
            currentPrice: coinPriceNow?.priceUSD,
        };
    }
    async sendEmailAlert(coin, previousPrice, currentPrice) {
        const percentageIncrease = (0, common_2.calculatePercentageIncrease)(previousPrice, currentPrice);
        const template = (0, priceIncreaseTemplate_1.generatePriceIncreaseTemplate)(coin, previousPrice, currentPrice, percentageIncrease);
        const msg = {
            to: this.configService.get('TOEMAIL'),
            from: this.configService.get('FROMMAIL'),
            subject: `${coin} Increase Notification`,
            html: template,
        };
        await this.emailService.sendEmail(msg);
    }
    alertChecker(alerts, coinPrice) {
        const result = {
            normalizeAlerts: [],
            triggerAlerts: [],
        };
        alerts.forEach((alert) => {
            const { priceThreshold, triggered, id } = alert;
            if (triggered && coinPrice < priceThreshold) {
                result.normalizeAlerts.push(alert);
            }
            if (!triggered && coinPrice > priceThreshold) {
                result.triggerAlerts.push(alert);
            }
        });
        return result;
    }
    async triggerAlertNotifications(alerts, coinPrice, coinSymbol) {
        if (alerts.length !== 0) {
            const generatedIdForAlerts = await Promise.all(alerts.map(async (alert) => {
                const { email, name, id } = alert;
                const template = (0, alertTemplate_1.alertTemplate)(coinSymbol, coinPrice, name);
                const msg = {
                    to: email,
                    from: this.configService.get('FROMMAIL'),
                    subject: `${name} Alert for ${coinSymbol}`,
                    html: template,
                };
                await this.emailService.sendEmail(msg);
                return id;
            }));
            await this.AlertRepository.update({ id: (0, typeorm_2.In)(generatedIdForAlerts) }, { triggered: true });
        }
    }
    async triggerOffAlerts(alerts) {
        if (alerts.length !== 0) {
            const ids = alerts.map((alert) => alert.id);
            await this.AlertRepository.update({ id: (0, typeorm_2.In)(ids) }, { triggered: false });
        }
    }
    async generateThresholdAlerts(coinPrices) {
        await Promise.all(coinPrices.map(async (coinPriceObject) => {
            const { priceUSD, coin } = coinPriceObject;
            const { symbol } = coin;
            const alerts = await this.AlertRepository.find({
                where: {
                    coin: {
                        symbol,
                    },
                },
                relations: { coin: true },
            });
            const { normalizeAlerts, triggerAlerts } = this.alertChecker(alerts, priceUSD);
            await this.triggerOffAlerts(normalizeAlerts);
            await this.triggerAlertNotifications(triggerAlerts, priceUSD, symbol);
        }));
    }
    async pollDataFromMolaris() {
        this.logger.log('Starting to poll prices after 5 minutes');
        const coinsToPoll = await this.CoinRepository.find();
        this.logger.log('🚀 ~ TaskService ~ pollDataFromMolaris ~ coinsToPoll:', coinsToPoll);
        const coinObject = coinsToPoll.reduce((acc, coin) => {
            acc[coin.symbol] = coin;
            return acc;
        }, {});
        const results = await Promise.all(coinsToPoll.map(async (coin) => {
            const symbol = coin.symbol;
            this.logger.log(`Fetching Data for ${symbol}`);
            const { symbol: symbolFromApi, price } = await this.cryptoService.getCryptoPricingUSD(symbol);
            const coinPrice = new coin_price_entity_1.CoinPrice();
            coinPrice.coin = coinObject[symbolFromApi];
            coinPrice.priceUSD = price;
            return coinPrice;
        }));
        this.logger.log('Updating the Prices for the coin');
        const savedCoinPrices = await this.CoinPriceRepository.save(results);
        this.generateThresholdAlerts(savedCoinPrices);
        this.logger.log('Starting to poll prices after 5 minutes');
    }
    async checkPriceIncrease() {
        const coins = await this.CoinRepository.find();
        this.logger.log(`started checking for email alert for ${coins.map((coin) => coin.symbol)}`);
        const initialResult = coins.reduce((acc, coin) => {
            if (coin.symbol && coin.symbol in config_1.TokenList) {
                acc[coin.symbol] = false;
            }
            return acc;
        }, {});
        const oneHourAgo = new Date();
        oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        const numberOfHoursToCheck = 1;
        const percentageToCheck = 3;
        await Promise.all(Object.keys(initialResult).map(async (coinName) => {
            const { generateAlert, previousPrice, currentPrice } = await this.checkIncreaseByPercentageInHours(coinName, numberOfHoursToCheck, percentageToCheck);
            generateAlert
                ? this.sendEmailAlert(coinName, previousPrice, currentPrice)
                : null;
        }));
    }
};
exports.TaskService = TaskService;
__decorate([
    (0, schedule_1.Interval)(config_1.TimeInMSToPollDataInterval),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "pollDataFromMolaris", null);
__decorate([
    (0, schedule_1.Cron)('0 0 * * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "checkPriceIncrease", null);
exports.TaskService = TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coin_entity_1.Coin)),
    __param(1, (0, typeorm_1.InjectRepository)(coin_price_entity_1.CoinPrice)),
    __param(2, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        crypto_service_1.CryptoService,
        email_service_1.EmailService,
        config_2.ConfigService])
], TaskService);
//# sourceMappingURL=task.service.js.map