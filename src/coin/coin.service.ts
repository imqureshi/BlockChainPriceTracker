import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from './entities/coin.entity';
import { Repository } from 'typeorm';
import { CoinPrice } from './entities/coin.price.entity';
import { ExchangeDTO } from './dto/exchange.dto';
import { CryptoService } from '../crypto/crypto.service';
import { TokenList } from 'src/config';
import { AdditionalTokenEnum } from '../config/types';

@Injectable()
export class CoinService {
  constructor(
    @InjectRepository(CoinPrice)
    private readonly CoinPriceRepository: Repository<CoinPrice>,
    private readonly cryptoService: CryptoService,
  ) {}

  async aggregateWrtHour(symbol: string) {
    const coinPricesByHour = await this.CoinPriceRepository.createQueryBuilder(
      'coinPrice',
    )
      .innerJoin('coinPrice.coin', 'coin')
      .select("to_char(coinPrice.createdAt, 'YYYY-MM-DD HH24:00:00')", 'hour')
      .addSelect('coinPrice.priceUSD', 'priceUSD')
      .addSelect('coin.symbol', 'symbol')
      .where("coinPrice.createdAt >= NOW() - INTERVAL '24 HOURS'")
      .andWhere('coin.symbol = :symbol', { symbol })
      .groupBy('hour')
      .addGroupBy('coinPrice.priceUSD')
      .addGroupBy('coin.symbol')
      .orderBy('hour', 'DESC')
      .getRawMany();
    return coinPricesByHour;
  }
  async exchange(exchangeDTO: ExchangeDTO) {
    const { noOfCoins } = exchangeDTO;
    const { symbol: symbolBTC, price: priceBTCInUSD } =
      await this.cryptoService.getCryptoPricingUSD(AdditionalTokenEnum.BTC);
    const { symbol: symbolETH, price: priceETHInUSD } =
      await this.cryptoService.getCryptoPricingUSD(AdditionalTokenEnum.BTC);
    if (!priceBTCInUSD || !priceETHInUSD) {
      throw new BadRequestException('Token price not found');
    }
    const ethToTokenRate = priceETHInUSD / priceBTCInUSD;
    const tokenAmount = noOfCoins * ethToTokenRate;
    const feePercentage = 0.03;
    const feeEth = noOfCoins * feePercentage;
    const feeInUSD = priceETHInUSD * feeEth;
    return {
      tokenAmount: tokenAmount.toFixed(6),
      fee: {
        [symbolETH]: feeEth.toFixed(6),
        usd: feeInUSD.toFixed(2),
      },
    };
  }
}
