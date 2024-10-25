import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Coin } from 'src/coin/entities/coin.entity';
import { CoinPrice } from 'src/coin/entities/coin.price.entity';
import { Alert } from 'src/alerts/entities/alert.entity';
import { SeederOptions, runSeeders } from 'typeorm-extension';
import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const DatabaseConfig: TypeOrmModuleOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Coin, CoinPrice, Alert],
  synchronize: true,
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
};

export const dbConfig = () => ({
  dbConfig: DatabaseConfig,
});

(async () => {
  const dataSource = new DataSource(
    DatabaseConfig as PostgresConnectionOptions,
  );
  await dataSource.initialize();

  await runSeeders(dataSource);
})();
