import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { CryptoService } from './crypto/crypto.service';
import { CryptoModule } from './crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig, DatabaseConfig } from './database/config';
import { CoinModule } from './coin/coin.module';
import { AlertsService } from './alerts/alerts.service';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [dbConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
    TaskModule,
    CryptoModule,
    EmailModule,
    CoinModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    TaskService,
    CryptoService,
    EmailService,
    AlertsService,
  ],
})
export class AppModule {}
