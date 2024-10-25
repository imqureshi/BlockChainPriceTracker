import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alert } from './entities/alert.entity';
import { CoinPrice } from 'src/coin/entities/coin.price.entity';
import { Coin } from 'src/coin/entities/coin.entity';

@Module({
  controllers: [AlertsController],
  imports: [
    TypeOrmModule.forFeature([Alert]),
    TypeOrmModule.forFeature([Coin]),
  ],
  providers: [AlertsService],
  exports: [AlertsService, TypeOrmModule],
})
export class AlertsModule {}
