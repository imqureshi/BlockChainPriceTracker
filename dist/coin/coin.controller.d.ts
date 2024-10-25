import { CoinService } from './coin.service';
import { ExchangeDTO } from './dto/exchange.dto';
export declare class CoinController {
    private readonly coinService;
    constructor(coinService: CoinService);
    aggregateWrtHour(symbol: string): Promise<any[]>;
    exchange(exchangeExchangeDTO: ExchangeDTO): Promise<{
        tokenAmount: string;
        fee: {
            [x: string]: string;
            usd: string;
        };
    }>;
}
