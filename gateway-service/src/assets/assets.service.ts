import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AssetsService {
    constructor(@Inject('ASSET_SERVICE') private client: ClientProxy, ) {}

    deposit(asset, amountToDeposit) {
        const newAmount = asset.amount + amountToDeposit;
        return lastValueFrom(this.client.send({ cmd: 'assets.amount.update' }, { _id: asset._id, amount: newAmount }));
    }

    withdraw(asset, amountToWithdraw) {
        const newAmount = asset.amount - amountToWithdraw;
        return lastValueFrom(this.client.send({ cmd: 'assets.amount.update' }, { _id: asset._id, amount: newAmount }));
    }

    rollback(asset) {
        return this.client.emit({ cmd: 'assets.amount.update' }, { _id: asset._id, amount: asset.amount });
    }

}
