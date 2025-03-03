import { Module } from '@nestjs/common';
import { AssetsController } from './assets.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssetsService } from './assets.service';

@Module({
  imports: [
      ClientsModule.register([
        { name: 'ASSET_SERVICE', transport: Transport.TCP, options: { host: "assets", port: 3001 } },
      ]),
    ],
  controllers: [AssetsController],
  providers: [AssetsService]
})
export class AssetsModule {}
