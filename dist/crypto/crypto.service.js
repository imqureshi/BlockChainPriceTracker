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
var CryptoService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const moralis_1 = require("moralis");
const config_1 = require("../config");
let CryptoService = CryptoService_1 = class CryptoService {
    constructor() {
        this.logger = new common_1.Logger(CryptoService_1.name);
    }
    async getCryptoPricingUSD(token) {
        try {
            const tokenPrice = await moralis_1.default.EvmApi.token.getTokenPrice({
                address: config_1.ChainAddress[token],
                chain: config_1.ChainEnum[token],
            });
            const { tokenSymbol, usdPrice } = tokenPrice.raw;
            const result = {
                symbol: tokenSymbol,
                price: usdPrice,
            };
            return result;
        }
        catch (error) {
            this.logger.error('Error fetching prices:', error);
            throw new Error('Error fetching prices');
        }
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = CryptoService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], CryptoService);
//# sourceMappingURL=crypto.service.js.map