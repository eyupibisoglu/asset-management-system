import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema } from './schemas/wallet.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      'mongodb+srv://' + process.env.DATABASE_USER + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.CLUSTER_INFO + '/' + process.env.DATABASE_NAME,
    ),
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
