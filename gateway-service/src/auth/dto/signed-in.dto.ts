import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class SignedInDto {
  @ApiProperty({
    description: 'The access token of the user',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlkIjoyLCJpYXQiOjE3NDA5MzYyNzQsImV4cCI6MTc0MTU0MTA3NH0.o9GlRaWw-WVVEtBHXaFOChDmzLYyxDdpIFFXlLIjc2s',
  })
  @IsNotEmpty()
  accessToken: string;

  
}
