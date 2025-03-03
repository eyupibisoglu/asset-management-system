import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreateTransferTaskDto {
    @ApiProperty({ type: String, description: 'The recipient asset id.', "example": "67c39735b3708c5b7c38e88c" })  
    to: Types.ObjectId;

    @ApiProperty({ type: String, description: 'The sender asset id.', "example": "67c399ecb3708c5b7c38e88e" })  
    from: Types.ObjectId;

    @ApiProperty({ 
        type: Number, 
        description: 'We can schedule task in order to delay transfer task. The delay is in milliseconds.', 
        example: '5000' 
      })
    @IsNotEmpty()
    delay: number;

    @ApiProperty({ 
        type: Number, 
        description: 'The amount of asset to transfer',
        example: '40' 
      })
    @IsNotEmpty()
    amount: number;


}
