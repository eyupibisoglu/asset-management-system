import { IsNotEmpty } from "class-validator";

export class CreateWalletDto {
 
    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    network: string;

    @IsNotEmpty()
    user: string;
}
