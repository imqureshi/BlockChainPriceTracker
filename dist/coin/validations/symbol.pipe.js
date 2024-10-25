"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("../../config");
let SymbolValidationPipe = class SymbolValidationPipe {
    transform(value) {
        if (!value || typeof value !== 'string' || value.trim().length === 0) {
            throw new common_1.BadRequestException('Invalid symbol');
        }
        const allowedValues = Object.values(config_1.TokenList);
        if (!allowedValues.includes(value.toUpperCase())) {
            throw new common_1.BadRequestException('Symbol not recognized');
        }
        return value.toUpperCase();
    }
};
exports.SymbolValidationPipe = SymbolValidationPipe;
exports.SymbolValidationPipe = SymbolValidationPipe = __decorate([
    (0, common_1.Injectable)()
], SymbolValidationPipe);
//# sourceMappingURL=symbol.pipe.js.map