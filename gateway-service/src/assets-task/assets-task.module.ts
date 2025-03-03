import { Module } from '@nestjs/common';
import { AssetsTaskController } from './assets-task.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'QUEUE_SERVICE', transport: Transport.TCP, options: { host: "asset-tasks", port: 3007 } },
    ]),
  ],
  controllers: [AssetsTaskController]
})
export class AssetsTaskModule {}
