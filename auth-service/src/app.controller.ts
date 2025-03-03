import { Controller, Get, Inject, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import SignInDto from './dto/sign-in.dto';
import { lastValueFrom } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, 
    @Inject('USERS_SERVICE') private usersClient: ClientProxy,
    private jwtService: JwtService,
  ) {}

  @MessagePattern({ cmd: 'auth.login' })
  async login(@Payload() signInDto: SignInDto) {
    const user = await lastValueFrom(this.usersClient.send({ cmd: 'users.findByEmail' }, signInDto));
    const isMatch = await lastValueFrom(this.usersClient.send({ cmd: 'users.verifyPassword' }, { password: signInDto.password, hashedPassword: user.password }));
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const accessToken = await this.jwtService.signAsync({ sub: user.id, id: user.id });

    return  { accessToken };
  }

  
}
