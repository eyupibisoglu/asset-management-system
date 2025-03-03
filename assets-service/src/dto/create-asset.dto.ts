import { IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreateAssetDto {
 
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    wallet: Types.ObjectId;
}
