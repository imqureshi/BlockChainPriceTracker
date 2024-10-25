import { PipeTransform } from '@nestjs/common';
export declare class SymbolValidationPipe implements PipeTransform {
    transform(value: string): string;
}
