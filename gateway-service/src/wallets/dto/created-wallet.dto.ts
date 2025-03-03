import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreatedWalletDto {
    @ApiProperty({ type: String, description: 'Id of wallet.', "example": "67c399ecb3708c5b7c38e88e" })  
    _id: Types.ObjectId;

    @ApiProperty({ type: String, description: 'Name of the wallet.', "example": "Eyüp's Wallet" })  
    name: string;

    @ApiProperty({ type: String, description: 'Network of the crypto', "example": "67c399ecb3708c5b7c38e88e" })  
    network: string;

    @ApiProperty({ 
        type: Number, 
        description: 'Address of the crypto.', 
        example: '67c399ecb3708c5b7c38e88e' 
      })
    @IsNotEmpty()
    address: string;
}
