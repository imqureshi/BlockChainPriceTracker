"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertsModule = void 0;
const common_1 = require("@nestjs/common");
const alerts_service_1 = require("./alerts.service");
const alerts_controller_1 = require("./alerts.controller");
const typeorm_1 = require("@nestjs/typeorm");
const alert_entity_1 = require("./entities/alert.entity");
const coin_entity_1 = require("../coin/entities/coin.entity");
let AlertsModule = class AlertsModule {
};
exports.AlertsModule = AlertsModule;
exports.AlertsModule = AlertsModule = __decorate([
    (0, common_1.Module)({
        controllers: [alerts_controller_1.AlertsController],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([alert_entity_1.Alert]),
            typeorm_1.TypeOrmModule.forFeature([coin_entity_1.Coin]),
        ],
        providers: [alerts_service_1.AlertsService],
        exports: [alerts_service_1.AlertsService, typeorm_1.TypeOrmModule],
    })
], AlertsModule);
//# sourceMappingURL=alerts.module.js.map