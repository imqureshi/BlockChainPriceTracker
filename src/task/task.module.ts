import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { CryptoService } from 'src/crypto/crypto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coin } from '../coin/entities/coin.entity';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { CoinPrice } from 'src/coin/entities/coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';

@Module({
  imports: [
    CryptoModule,
    TypeOrmModule.forFeature([Coin, CoinPrice, Alert]),
    EmailModule,
  ],
  providers: [TaskService],
  exports: [TypeOrmModule],
})
export class TaskModule {}
