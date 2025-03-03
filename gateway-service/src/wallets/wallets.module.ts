import { Module } from '@nestjs/common';
import { WalletsController } from './wallets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'WALLET_SERVICE', transport: Transport.TCP, options: { host: "wallets", port: 3002 } },
    ]),
  ],
  controllers: [WalletsController],
})
export class WalletsModule {}
