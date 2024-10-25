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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coin_price_entity_1 = require("./entities/coin.price.entity");
const crypto_service_1 = require("../crypto/crypto.service");
const types_1 = require("../config/types");
let CoinService = class CoinService {
    constructor(CoinPriceRepository, cryptoService) {
        this.CoinPriceRepository = CoinPriceRepository;
        this.cryptoService = cryptoService;
    }
    async aggregateWrtHour(symbol) {
        const coinPricesByHour = await this.CoinPriceRepository.createQueryBuilder('coinPrice')
            .innerJoin('coinPrice.coin', 'coin')
            .select("to_char(coinPrice.createdAt, 'YYYY-MM-DD HH24:00:00')", 'hour')
            .addSelect('coinPrice.priceUSD', 'priceUSD')
            .addSelect('coin.symbol', 'symbol')
            .where("coinPrice.createdAt >= NOW() - INTERVAL '24 HOURS'")
            .andWhere('coin.symbol = :symbol', { symbol })
            .groupBy('hour')
            .addGroupBy('coinPrice.priceUSD')
            .addGroupBy('coin.symbol')
            .orderBy('hour', 'DESC')
            .getRawMany();
        return coinPricesByHour;
    }
    async exchange(exchangeDTO) {
        const { noOfCoins } = exchangeDTO;
        const { symbol: symbolBTC, price: priceBTCInUSD } = await this.cryptoService.getCryptoPricingUSD(types_1.AdditionalTokenEnum.BTC);
        const { symbol: symbolETH, price: priceETHInUSD } = await this.cryptoService.getCryptoPricingUSD(types_1.AdditionalTokenEnum.BTC);
        if (!priceBTCInUSD || !priceETHInUSD) {
            throw new common_1.BadRequestException('Token price not found');
        }
        const ethToTokenRate = priceETHInUSD / priceBTCInUSD;
        const tokenAmount = noOfCoins * ethToTokenRate;
        const feePercentage = 0.03;
        const feeEth = noOfCoins * feePercentage;
        const feeInUSD = priceETHInUSD * feeEth;
        return {
            tokenAmount: tokenAmount.toFixed(6),
            fee: {
                [symbolETH]: feeEth.toFixed(6),
                usd: feeInUSD.toFixed(2),
            },
        };
    }
};
exports.CoinService = CoinService;
exports.CoinService = CoinService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coin_price_entity_1.CoinPrice)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        crypto_service_1.CryptoService])
], CoinService);
//# sourceMappingURL=coin.service.js.map