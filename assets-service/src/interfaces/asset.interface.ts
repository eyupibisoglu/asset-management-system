import { Types } from 'mongoose';

export interface Asset {
    name: string;
    amount: number;
    wallet: Types.ObjectId;
}