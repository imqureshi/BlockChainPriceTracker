import { CryptoService } from '../crypto/crypto.service';
import { Coin } from '../coin/entities/coin.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { CoinPrice } from 'src/coin/entities/coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
export declare class TaskService {
    private CoinRepository;
    private CoinPriceRepository;
    private AlertRepository;
    private readonly cryptoService;
    private readonly emailService;
    private readonly configService;
    private readonly logger;
    constructor(CoinRepository: Repository<Coin>, CoinPriceRepository: Repository<CoinPrice>, AlertRepository: Repository<Alert>, cryptoService: CryptoService, emailService: EmailService, configService: ConfigService);
    private checkIncreaseByPercentageInHours;
    private sendEmailAlert;
    private alertChecker;
    private triggerAlertNotifications;
    private triggerOffAlerts;
    private generateThresholdAlerts;
    pollDataFromMolaris(): Promise<void>;
    checkPriceIncrease(): Promise<void>;
}
