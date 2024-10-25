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
exports.Coin = void 0;
const typeorm_1 = require("typeorm");
const coin_price_entity_1 = require("./coin.price.entity");
const alert_entity_1 = require("../../alerts/entities/alert.entity");
let Coin = class Coin {
};
exports.Coin = Coin;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Coin.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Coin.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Coin.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => coin_price_entity_1.CoinPrice, (coinPrice) => coinPrice.coin),
    __metadata("design:type", Array)
], Coin.prototype, "coinPriceHistory", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => alert_entity_1.Alert, (alert) => alert.coin),
    __metadata("design:type", Array)
], Coin.prototype, "alerts", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Coin.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Coin.prototype, "updatedAt", void 0);
exports.Coin = Coin = __decorate([
    (0, typeorm_1.Entity)()
], Coin);
//# sourceMappingURL=coin.entity.js.map