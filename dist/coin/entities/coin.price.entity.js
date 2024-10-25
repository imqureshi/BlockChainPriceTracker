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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinPrice = void 0;
const typeorm_1 = require("typeorm");
const coin_entity_1 = require("./coin.entity");
let CoinPrice = class CoinPrice {
};
exports.CoinPrice = CoinPrice;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CoinPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float4',
    }),
    __metadata("design:type", Number)
], CoinPrice.prototype, "priceUSD", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => coin_entity_1.Coin, (coin) => coin.coinPriceHistory),
    __metadata("design:type", coin_entity_1.Coin)
], CoinPrice.prototype, "coin", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CoinPrice.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], CoinPrice.prototype, "updatedAt", void 0);
exports.CoinPrice = CoinPrice = __decorate([
    (0, typeorm_1.Entity)()
], CoinPrice);
//# sourceMappingURL=coin.price.entity.js.map