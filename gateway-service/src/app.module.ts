import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WalletsModule } from './wallets/wallets.module';
import { AssetsModule } from './assets/assets.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BullModule } from '@nestjs/bullmq';
import { AssetsTaskModule } from './assets-task/assets-task.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    WalletsModule,
    AssetsModule,
    AuthModule,
    UsersModule,
    AssetsTaskModule,
  ],
  controllers: [AppController],
  providers: [ AppService],
})
export class AppModule {}
