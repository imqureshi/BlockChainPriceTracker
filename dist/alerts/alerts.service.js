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
exports.AlertsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const alert_entity_1 = require("./entities/alert.entity");
const typeorm_2 = require("typeorm");
const coin_entity_1 = require("../coin/entities/coin.entity");
let AlertsService = class AlertsService {
    constructor(AlertRepository, CoinRepository) {
        this.AlertRepository = AlertRepository;
        this.CoinRepository = CoinRepository;
    }
    async create(createAlertDto) {
        const { email, chain, dollar, name } = createAlertDto;
        const coin = await this.CoinRepository.findOne({
            where: { symbol: chain },
        });
        const alert = new alert_entity_1.Alert();
        alert.coin = coin;
        alert.priceThreshold = dollar;
        alert.email = email;
        alert.name = name;
        return await this.AlertRepository.save(alert);
    }
};
exports.AlertsService = AlertsService;
exports.AlertsService = AlertsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(alert_entity_1.Alert)),
    __param(1, (0, typeorm_1.InjectRepository)(coin_entity_1.Coin)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AlertsService);
//# sourceMappingURL=alerts.service.js.map