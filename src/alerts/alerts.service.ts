import { Injectable } from '@nestjs/common';
import { CreateAlertDto } from './dto/create-alert.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { Repository } from 'typeorm';
import { Coin } from 'src/coin/entities/coin.entity';

@Injectable()
export class AlertsService {
  constructor(
    @InjectRepository(Alert)
    private readonly AlertRepository: Repository<Alert>,
    @InjectRepository(Coin)
    private readonly CoinRepository: Repository<Coin>,
  ) {}
  async create(createAlertDto: CreateAlertDto) {
    const { email, chain, dollar, name } = createAlertDto;
    const coin = await this.CoinRepository.findOne({
      where: { symbol: chain },
    });
    const alert = new Alert();
    alert.coin = coin;
    alert.priceThreshold = dollar;
    alert.email = email;
    alert.name = name;
    return await this.AlertRepository.save(alert);
  }
}
