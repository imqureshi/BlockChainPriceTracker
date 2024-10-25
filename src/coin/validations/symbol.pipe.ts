import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { TokenList } from 'src/config';

@Injectable()
export class SymbolValidationPipe implements PipeTransform {
  transform(value: string) {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      throw new BadRequestException('Invalid symbol');
    }
    const allowedValues = Object.values(TokenList) as string[];
    if (!allowedValues.includes(value.toUpperCase())) {
      throw new BadRequestException('Symbol not recognized');
    }
    return value.toUpperCase();
  }
}
