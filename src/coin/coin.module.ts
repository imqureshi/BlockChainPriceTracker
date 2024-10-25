import { Module } from '@nestjs/common';
import { CoinService } from './coin.service';
import { CoinController } from './coin.controller';
import { CryptoService } from 'src/crypto/crypto.service';
import { CryptoModule } from 'src/crypto/crypto.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinPrice } from './entities/coin.price.entity';
import { Coin } from './entities/coin.entity';

@Module({
  imports: [
    CryptoModule,
    TypeOrmModule.forFeature([CoinPrice]),
    TypeOrmModule.forFeature([Coin]),
  ],
  controllers: [CoinController],
  providers: [CoinService, CryptoService, TypeOrmModule],
})
export class CoinModule {}
