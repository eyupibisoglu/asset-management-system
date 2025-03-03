import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTransferTaskDto } from './dto/create-transfer-task.dto';

@Controller('assets-task')
export class AssetsTaskController {
    constructor(@Inject('QUEUE_SERVICE') private queueClient: ClientProxy,) {}

    @ApiOperation({ summary: 'Create a transfer task.' })
    @ApiResponse({ status: 201 })
    @ApiBody({ type: CreateTransferTaskDto })
    @ApiBearerAuth()
    @Post()
    async transfer(@Body() data) {
        return this.queueClient.send({ cmd: 'queue.transfer.add' }, data);
    }
}
