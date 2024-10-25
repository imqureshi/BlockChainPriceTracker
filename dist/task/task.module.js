"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModule = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const crypto_module_1 = require("../crypto/crypto.module");
const typeorm_1 = require("@nestjs/typeorm");
const coin_entity_1 = require("../coin/entities/coin.entity");
const email_module_1 = require("../email/email.module");
const coin_price_entity_1 = require("../coin/entities/coin.price.entity");
const alert_entity_1 = require("../alerts/entities/alert.entity");
let TaskModule = class TaskModule {
};
exports.TaskModule = TaskModule;
exports.TaskModule = TaskModule = __decorate([
    (0, common_1.Module)({
        imports: [
            crypto_module_1.CryptoModule,
            typeorm_1.TypeOrmModule.forFeature([coin_entity_1.Coin, coin_price_entity_1.CoinPrice, alert_entity_1.Alert]),
            email_module_1.EmailModule,
        ],
        providers: [task_service_1.TaskService],
        exports: [typeorm_1.TypeOrmModule],
    })
], TaskModule);
//# sourceMappingURL=task.module.js.map