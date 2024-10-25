import { Repository } from 'typeorm';
import { CoinPrice } from './entities/coin.price.entity';
import { ExchangeDTO } from './dto/exchange.dto';
import { CryptoService } from '../crypto/crypto.service';
export declare class CoinService {
    private readonly CoinPriceRepository;
    private readonly cryptoService;
    constructor(CoinPriceRepository: Repository<CoinPrice>, cryptoService: CryptoService);
    aggregateWrtHour(symbol: string): Promise<any[]>;
    exchange(exchangeDTO: ExchangeDTO): Promise<{
        tokenAmount: string;
        fee: {
            [x: string]: string;
            usd: string;
        };
    }>;
}
