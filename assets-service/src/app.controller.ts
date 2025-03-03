import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Asset } from './interfaces/asset.interface';
import { UpdateAssetAmountDto } from './dto/update-asset-amount.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'assets.create' })
  create(@Payload() createAssetDto: CreateAssetDto): Promise<Asset> {
    return this.appService.create(createAssetDto);
  }

  @MessagePattern({ cmd: 'assets.findAll' })
  findAll(): Promise<Asset[]> {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'assets.findById' })
  findById(@Payload('_id') id: string): Promise<Asset | null> {
    return this.appService.findById(id);
  }

  @MessagePattern({ cmd: 'assets.amount.update' })
  async update(@Payload() updateAssetAmountDto: UpdateAssetAmountDto): Promise<Asset | null> {
    return this.appService.updateAmount(updateAssetAmountDto);
  }
}
