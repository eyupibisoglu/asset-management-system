import { IsNotEmpty } from "class-validator";

export class UpdateAssetAmountDto {
 
    @IsNotEmpty()
    _id: string;

    @IsNotEmpty()
    amount: number;
}
