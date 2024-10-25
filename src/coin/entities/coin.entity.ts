import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { CoinPrice } from './coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
@Entity()
export class Coin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  symbol: string;

  @OneToMany(() => CoinPrice, (coinPrice) => coinPrice.coin)
  coinPriceHistory: CoinPrice[];

  @OneToMany(() => Alert, (alert) => alert.coin)
  alerts: Alert[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
