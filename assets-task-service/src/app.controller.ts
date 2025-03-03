import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern({ cmd: 'queue.transfer.add' })
    addQueue(@Payload() data) {
        return this.appService.addQueue(data);
    }
}
