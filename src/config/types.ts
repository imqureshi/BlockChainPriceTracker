export enum ChainAddress {
  ETH = '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
  MATIC = '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
  BTC = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
}

export enum TokenList {
  ETH = 'ETH',
  MATIC = 'MATIC',
}

export class StandardResponse<T> {
  status: number;
  message: string;
  data?: T;
  error?: string;
}

export enum AdditionalTokenEnum {
  BTC = 'BTC',
  ETH = 'ETH',
  MATIC = 'MATIC',
}

export enum ChainEnum {
  BTC = '0x1',
  ETH = '0x38',
  MATIC = '0x1',
}
