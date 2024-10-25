import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Coin } from './coin.entity';
@Entity()
export class CoinPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float4',
  })
  priceUSD: number;

  @ManyToOne(() => Coin, (coin) => coin.coinPriceHistory)
  coin: Coin;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
