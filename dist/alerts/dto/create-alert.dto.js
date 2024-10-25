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
exports.CreateAlertDto = void 0;
const class_validator_1 = require("class-validator");
const config_1 = require("../../config");
const swagger_1 = require("@nestjs/swagger");
class CreateAlertDto {
}
exports.CreateAlertDto = CreateAlertDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: 'email you want to send the alert to',
        example: 'example@email.com',
    }),
    __metadata("design:type", String)
], CreateAlertDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(config_1.TokenList),
    (0, swagger_1.ApiProperty)({
        description: 'the coin you want to put the alert on add the symbol here',
        enum: config_1.TokenList,
        example: 'ETH',
    }),
    __metadata("design:type", String)
], CreateAlertDto.prototype, "chain", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'the dollar value you want to send the threshold on',
        example: 10,
    }),
    __metadata("design:type", Number)
], CreateAlertDto.prototype, "dollar", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of the alert',
        example: 'Alert on high eth',
    }),
    __metadata("design:type", String)
], CreateAlertDto.prototype, "name", void 0);
//# sourceMappingURL=create-alert.dto.js.map