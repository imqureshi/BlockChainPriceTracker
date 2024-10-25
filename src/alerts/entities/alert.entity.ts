import { Coin } from 'src/coin/entities/coin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'float4',
  })
  priceThreshold: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: false })
  triggered: boolean;

  @ManyToOne(() => Coin, (coin) => coin.alerts)
  coin: Coin;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
