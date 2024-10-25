import { Injectable, Logger } from '@nestjs/common';
import Moralis from 'moralis';
import {
  AdditionalTokenEnum,
  ChainAddress,
  ChainEnum,
  TokenList,
} from '../config';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);
  constructor() {}
  async getCryptoPricingUSD(token: AdditionalTokenEnum) {
    try {
      const tokenPrice = await Moralis.EvmApi.token.getTokenPrice({
        address: ChainAddress[token],
        chain: ChainEnum[token],
      });
      const { tokenSymbol, usdPrice } = tokenPrice.raw;
      const result: { symbol: TokenList; price: number } = {
        symbol: tokenSymbol as TokenList,
        price: usdPrice,
      };
      return result;
    } catch (error) {
      this.logger.error('Error fetching prices:', error);
      throw new Error('Error fetching prices');
    }
  }
}
