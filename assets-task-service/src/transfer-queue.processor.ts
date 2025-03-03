import { Processor, WorkerHost } from '@nestjs/bullmq';
import { HttpException, Inject } from '@nestjs/common';
import { Job } from 'bullmq';
import { AppService } from './app.service';
import { lastValueFrom } from 'rxjs';
import { DateTime } from 'luxon';

@Processor('asset-transaction-queue')
export class TransferQueueProcessor extends WorkerHost {
    constructor(private readonly appService: AppService) {
        super();
    }

  async process(job: Job) {
    try
    {
      console.log('Processing file:', job.id, DateTime.now());
      const { amount, from, to } = job.data;
      let hasWithdraw = false;

        const fromAsset = await this.appService.findById(from);
        const toAsset = await this.appService.findById(to);

        try {

            if (  !fromAsset || !toAsset )
                throw new HttpException('Asset does not exists.', 400);

            if (fromAsset.amount < amount)
                throw new HttpException('Insufficient funds.', 400);

            await this.appService.withdraw(fromAsset, amount);
            hasWithdraw = true;
            await this.appService.deposit(toAsset, amount);
            console.log('Transfer completed');
            return;

        } catch (error) { // rollback (Basic implementation of SAGA pattern)
            if (hasWithdraw) {
                await this.appService.rollback(fromAsset);
            }

            throw error;
        }
    }
    catch (error)
    {
        console.log(`Error processing file: ${error}`);
    }
  }
}
