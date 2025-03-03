import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Types } from 'mongoose';

export class CreateUserDto {
    @ApiProperty({ type: String, description: 'User email.', "example": "ibisoglueyup@gmail.com" })  
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ type: String, description: 'User name', "example": "Eyüp İbişoğlu" })  
    name: string;

    @ApiProperty({ 
        type: Number, 
        description: 'User password.', 
        example: '123456' 
      })
    @IsNotEmpty()
    password: string;
}
