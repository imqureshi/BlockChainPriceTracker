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
exports.CoinController = void 0;
const common_1 = require("@nestjs/common");
const coin_service_1 = require("./coin.service");
const symbol_pipe_1 = require("./validations/symbol.pipe");
const exchange_dto_1 = require("./dto/exchange.dto");
let CoinController = class CoinController {
    constructor(coinService) {
        this.coinService = coinService;
    }
    aggregateWrtHour(symbol) {
        return this.coinService.aggregateWrtHour(symbol);
    }
    exchange(exchangeExchangeDTO) {
        return this.coinService.exchange(exchangeExchangeDTO);
    }
};
exports.CoinController = CoinController;
__decorate([
    (0, common_1.Get)('/aggregate/:symbol'),
    (0, common_1.UsePipes)(new symbol_pipe_1.SymbolValidationPipe()),
    __param(0, (0, common_1.Param)('symbol')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CoinController.prototype, "aggregateWrtHour", null);
__decorate([
    (0, common_1.Post)('/exchange'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exchange_dto_1.ExchangeDTO]),
    __metadata("design:returntype", void 0)
], CoinController.prototype, "exchange", null);
exports.CoinController = CoinController = __decorate([
    (0, common_1.Controller)('coin'),
    __metadata("design:paramtypes", [coin_service_1.CoinService])
], CoinController);
//# sourceMappingURL=coin.controller.js.map