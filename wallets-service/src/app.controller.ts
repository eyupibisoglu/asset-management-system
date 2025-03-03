import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './interfaces/wallet.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'wallets.create' })
  async create(@Payload() createWalletDto: CreateWalletDto): Promise<Wallet | HttpException> {
    const wallet = await this.appService.findOne({ address: createWalletDto.address, network: createWalletDto.network });

    if ( wallet )
      return new HttpException('Wallet already exists', 400);
    else
      return this.appService.create(createWalletDto);
  }

  @MessagePattern({ cmd: 'wallets.findOne' })
  findOne(@Payload('id') id): Promise<Wallet | null> {
    return this.appService.findById(id);
  }

  @MessagePattern({ cmd: 'wallets.delete' })
  delete(@Payload('id') id) {
    return this.appService.delete(id);
  }
}
