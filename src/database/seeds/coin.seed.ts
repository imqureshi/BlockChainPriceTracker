import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Coin } from '../../coin/entities/coin.entity';

export default class CoinSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = true;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Coin);
    await repository.insert([
      {
        name: 'Ethereum Token',
        symbol: 'ETH',
      },
      {
        name: 'Matic Token',
        symbol: 'MATIC',
      },
    ]);
  }
}
