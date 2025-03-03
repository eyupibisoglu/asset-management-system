import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreateAssetDto {
    @ApiProperty({ 
        type: String, 
        description: 'The name of the asset.', 
        example: 'BTC' 
      })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        type: Number, 
        description: 'The amount of asset', 
        example: '40' 
      })
    @IsNotEmpty()
    amount: number;

    @ApiProperty({ type: String, description: 'Wallet of asset.', "example": "60d0fe4f5311236168a109ca" })  
    @IsNotEmpty()
    wallet: Types.ObjectId;
}
