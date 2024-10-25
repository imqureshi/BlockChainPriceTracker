"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinModule = void 0;
const common_1 = require("@nestjs/common");
const coin_service_1 = require("./coin.service");
const coin_controller_1 = require("./coin.controller");
const crypto_service_1 = require("../crypto/crypto.service");
const crypto_module_1 = require("../crypto/crypto.module");
const typeorm_1 = require("@nestjs/typeorm");
const coin_price_entity_1 = require("./entities/coin.price.entity");
const coin_entity_1 = require("./entities/coin.entity");
let CoinModule = class CoinModule {
};
exports.CoinModule = CoinModule;
exports.CoinModule = CoinModule = __decorate([
    (0, common_1.Module)({
        imports: [
            crypto_module_1.CryptoModule,
            typeorm_1.TypeOrmModule.forFeature([coin_price_entity_1.CoinPrice]),
            typeorm_1.TypeOrmModule.forFeature([coin_entity_1.Coin]),
        ],
        controllers: [coin_controller_1.CoinController],
        providers: [coin_service_1.CoinService, crypto_service_1.CryptoService, typeorm_1.TypeOrmModule],
    })
], CoinModule);
//# sourceMappingURL=coin.module.js.map