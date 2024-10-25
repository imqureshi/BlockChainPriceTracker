import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
export default class CoinSeeder implements Seeder {
    track: boolean;
    run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any>;
}
