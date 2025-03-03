import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Asset } from './interfaces/asset.interface';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Model } from 'mongoose';
import { UpdateAssetAmountDto } from './dto/update-asset-amount.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('Asset') private assetModel: Model<Asset>,) {}

  create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const asset = new this.assetModel(createAssetDto);
    return asset.save();
  }

  findAll(): Promise<Asset[]> {
    return this.assetModel.find();
  }

  findById(id: string): Promise<Asset | null> {
    return this.assetModel.findById(id);
  }

  async updateAmount(updateAssetAmountDto: UpdateAssetAmountDto): Promise<Asset | null> {
    const asset = await this.assetModel.findById(updateAssetAmountDto._id);

    if (!asset) {
      throw new HttpException('Asset not found', 404);
    }

    asset.set('amount', updateAssetAmountDto.amount);
    return  asset.save();

  }
}
