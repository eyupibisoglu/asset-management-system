import { InjectQueue } from '@nestjs/bullmq';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Queue } from 'bullmq';
import { lastValueFrom } from 'rxjs';
import { DateTime } from 'luxon';

@Injectable()
export class AppService {
    constructor(
      @Inject('ASSET_SERVICE') private client: ClientProxy, 
      @InjectQueue('asset-transaction-queue') private transactionQueue: Queue
    ) {}

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

    findById(_id) {
      return lastValueFrom(this.client.send({ cmd: 'assets.findById' }, { _id }));;
    }

    addQueue(data){ 
      const scheduledDate = DateTime.fromISO(data.scheduledIsoTime);
      const now = DateTime.now();
      const delay = scheduledDate.diff(now).as('milliseconds');
      
        return this.transactionQueue.add('transfer', data, { delay: delay });
    }

}
