import { Coin } from './coin.entity';
export declare class CoinPrice {
    id: number;
    priceUSD: number;
    coin: Coin;
    createdAt: Date;
    updatedAt: Date;
}
