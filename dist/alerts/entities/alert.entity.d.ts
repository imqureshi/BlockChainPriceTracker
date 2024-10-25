import { Coin } from 'src/coin/entities/coin.entity';
export declare class Alert {
    id: number;
    priceThreshold: number;
    name: string;
    email: string;
    triggered: boolean;
    coin: Coin;
    createdAt: Date;
    updatedAt: Date;
}
