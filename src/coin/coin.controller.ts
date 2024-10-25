import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { CoinService } from './coin.service';
import { SymbolValidationPipe } from './validations/symbol.pipe';
import { ExchangeDTO } from './dto/exchange.dto';

@Controller('coin')
export class CoinController {
  constructor(private readonly coinService: CoinService) {}

  @Get('/aggregate/:symbol')
  @UsePipes(new SymbolValidationPipe())
  aggregateWrtHour(@Param('symbol') symbol: string) {
    return this.coinService.aggregateWrtHour(symbol);
  }

  @Post('/exchange')
  exchange(@Body() exchangeExchangeDTO: ExchangeDTO) {
    return this.coinService.exchange(exchangeExchangeDTO);
  }
}
