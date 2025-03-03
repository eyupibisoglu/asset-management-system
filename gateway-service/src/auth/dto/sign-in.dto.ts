import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class SignInDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'JD123...',
  })
  @IsNotEmpty()
  password: string;

  
}
