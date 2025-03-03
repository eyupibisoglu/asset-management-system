import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './interfaces/wallet.interface';
import { CreateWalletDto } from './dto/create-wallet.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel('Wallet') private walletModel: Model<Wallet>,) {}

  create(createWalletDto: CreateWalletDto): Promise<Wallet> {
    const wallet = new this.walletModel(createWalletDto);
    return wallet.save();
  }

  findById(id): Promise<Wallet | null> {
    return this.walletModel.findById(id);
  }

  findOne(condition) {
    return this.walletModel.findOne(condition);
  }

  delete(id) {
    return this.walletModel.findByIdAndDelete(id);
  }
}
