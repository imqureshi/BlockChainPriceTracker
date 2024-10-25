import { CreateAlertDto } from './dto/create-alert.dto';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { Coin } from 'src/coin/entities/coin.entity';
export declare class AlertsService {
    private readonly AlertRepository;
    private readonly CoinRepository;
    constructor(AlertRepository: Repository<Alert>, CoinRepository: Repository<Coin>);
    create(createAlertDto: CreateAlertDto): Promise<Alert>;
}
