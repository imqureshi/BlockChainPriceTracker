import { CoinPrice } from './coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
export declare class Coin {
    id: number;
    name: string;
    symbol: string;
    coinPriceHistory: CoinPrice[];
    alerts: Alert[];
    createdAt: Date;
    updatedAt: Date;
}
