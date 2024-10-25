import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Cron, Interval } from '@nestjs/schedule';
import { CryptoService } from '../crypto/crypto.service';
import {
  checkIncreaseFromPercentage,
  calculatePercentageIncrease,
} from '../common';
import {
  TimeInMSToPollDataInterval,
  TokenList,
  CheckAndComparePriceIncreaseInterval,
  AdditionalTokenEnum,
} from '../config';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '../coin/entities/coin.entity';
import { In, Repository, LessThanOrEqual } from 'typeorm';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';
import { CoinPrice } from 'src/coin/entities/coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
import { alertTemplate } from 'src/static/alertTemplate';
import { generatePriceIncreaseTemplate } from 'src/static/priceIncreaseTemplate';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectRepository(Coin)
    private CoinRepository: Repository<Coin>,
    @InjectRepository(CoinPrice)
    private CoinPriceRepository: Repository<CoinPrice>,
    @InjectRepository(Alert)
    private AlertRepository: Repository<Alert>,
    private readonly cryptoService: CryptoService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  private async checkIncreaseByPercentageInHours(
    coinName: TokenList,
    hours: number,
    percentage: number,
  ): Promise<{
    generateAlert: boolean;
    previousPrice: number;
    currentPrice: number;
  }> {
    const deltaDate = new Date();
    deltaDate.setHours(deltaDate.getHours() - hours);
    const result = await this.CoinPriceRepository.find({
      where: {
        coin: {
          symbol: coinName,
        },
      },
      order: { createdAt: 'DESC' },
      relations: { coin: true },
      take: 2,
    });
    const [coinPriceNow, coinOneHourAgo] = result;
    this.logger.log(
      `previousPrice: ${coinOneHourAgo?.priceUSD},previousPrice: ${coinPriceNow}, percentageIncrease:${percentage}`,
    );
    return {
      generateAlert: checkIncreaseFromPercentage(
        coinOneHourAgo?.priceUSD,
        coinPriceNow?.priceUSD,
        percentage,
      ),
      previousPrice: coinOneHourAgo?.priceUSD,
      currentPrice: coinPriceNow?.priceUSD,
    };
  }

  private async sendEmailAlert(
    coin: TokenList,
    previousPrice: number,
    currentPrice: number,
  ) {
    const percentageIncrease = calculatePercentageIncrease(
      previousPrice,
      currentPrice,
    );
    const template = generatePriceIncreaseTemplate(
      coin,
      previousPrice,
      currentPrice,
      percentageIncrease,
    );
    const msg = {
      to: this.configService.get<string>('TOEMAIL'),
      from: this.configService.get<string>('FROMMAIL'),
      subject: `${coin} Increase Notification`,
      html: template,
    };
    await this.emailService.sendEmail(msg);
  }

  private alertChecker(
    alerts: Alert[],
    coinPrice: number,
  ): { normalizeAlerts: Array<Alert>; triggerAlerts: Array<Alert> } {
    const result = {
      normalizeAlerts: [] as Alert[],
      triggerAlerts: [] as Alert[],
    };
    alerts.forEach((alert) => {
      const { priceThreshold, triggered, id } = alert;

      if (triggered && coinPrice < priceThreshold) {
        result.normalizeAlerts.push(alert);
      }
      if (!triggered && coinPrice > priceThreshold) {
        result.triggerAlerts.push(alert);
      }
    });
    return result;
  }

  private async triggerAlertNotifications(
    alerts: Alert[],
    coinPrice: number,
    coinSymbol: string,
  ) {
    if (alerts.length !== 0) {
      const generatedIdForAlerts = await Promise.all(
        alerts.map(async (alert) => {
          const { email, name, id } = alert;
          const template = alertTemplate(coinSymbol, coinPrice, name);
          const msg = {
            to: email,
            from: this.configService.get<string>('FROMMAIL'),
            subject: `${name} Alert for ${coinSymbol}`,
            html: template,
          };
          await this.emailService.sendEmail(msg);
          return id;
        }),
      );
      await this.AlertRepository.update(
        { id: In(generatedIdForAlerts) },
        { triggered: true },
      );
    }
  }

  private async triggerOffAlerts(alerts: Alert[]) {
    if (alerts.length !== 0) {
      const ids = alerts.map((alert) => alert.id);
      await this.AlertRepository.update({ id: In(ids) }, { triggered: false });
    }
  }

  private async generateThresholdAlerts(coinPrices: CoinPrice[]) {
    await Promise.all(
      coinPrices.map(async (coinPriceObject) => {
        const { priceUSD, coin } = coinPriceObject;
        const { symbol } = coin;
        const alerts = await this.AlertRepository.find({
          where: {
            coin: {
              symbol,
            },
          },
          relations: { coin: true },
        });
        const { normalizeAlerts, triggerAlerts } = this.alertChecker(
          alerts,
          priceUSD,
        );
        await this.triggerOffAlerts(normalizeAlerts);
        await this.triggerAlertNotifications(triggerAlerts, priceUSD, symbol);
      }),
    );
  }

  @Interval(TimeInMSToPollDataInterval)
  async pollDataFromMolaris() {
    this.logger.log('Starting to poll prices after 5 minutes');
    const coinsToPoll = await this.CoinRepository.find();
    this.logger.log(
      '🚀 ~ TaskService ~ pollDataFromMolaris ~ coinsToPoll:',
      coinsToPoll,
    );
    const coinObject = coinsToPoll.reduce((acc, coin) => {
      acc[coin.symbol] = coin;
      return acc;
    }, {});
    const results = await Promise.all(
      coinsToPoll.map(async (coin) => {
        const symbol = coin.symbol;
        this.logger.log(`Fetching Data for ${symbol}`);
        const { symbol: symbolFromApi, price } =
          await this.cryptoService.getCryptoPricingUSD(
            symbol as AdditionalTokenEnum,
          );
        const coinPrice = new CoinPrice();
        coinPrice.coin = coinObject[symbolFromApi];
        coinPrice.priceUSD = price;
        return coinPrice;
      }),
    );

    this.logger.log('Updating the Prices for the coin');
    const savedCoinPrices = await this.CoinPriceRepository.save(results);
    this.generateThresholdAlerts(savedCoinPrices);

    this.logger.log('Starting to poll prices after 5 minutes');
  }

  @Cron('0 0 * * * *')
  async checkPriceIncrease() {
    const coins = await this.CoinRepository.find();
    this.logger.log(
      `started checking for email alert for ${coins.map((coin) => coin.symbol)}`,
    );
    const initialResult = coins.reduce(
      (acc: Record<string, boolean>, coin: Partial<Coin>) => {
        if (coin.symbol && coin.symbol in TokenList) {
          acc[coin.symbol as TokenList] = false; // Assert coin.name as TokenList
        }
        return acc;
      },
      {},
    ) as Record<TokenList, boolean>;
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const numberOfHoursToCheck = 1;
    const percentageToCheck = 3;
    await Promise.all(
      Object.keys(initialResult).map(async (coinName: TokenList) => {
        const { generateAlert, previousPrice, currentPrice } =
          await this.checkIncreaseByPercentageInHours(
            coinName,
            numberOfHoursToCheck,
            percentageToCheck,
          );
        generateAlert
          ? this.sendEmailAlert(coinName, previousPrice, currentPrice)
          : null;
      }),
    );
  }
}
