import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SeederOptions } from 'typeorm-extension';
import 'dotenv/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
export declare const DatabaseConfig: TypeOrmModuleOptions & SeederOptions;
export declare const dbConfig: () => {
    dbConfig: {
        retryAttempts?: number;
        retryDelay?: number;
        toRetry?: (err: any) => boolean;
        autoLoadEntities?: boolean;
        keepConnectionAlive?: boolean;
        verboseRetryLog?: boolean;
        manualInitialization?: boolean;
    } & Partial<PostgresConnectionOptions> & SeederOptions;
};
