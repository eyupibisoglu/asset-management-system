import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import CreateUserDto from './dto/create-user.dto';
import { HashPasswordPipe } from './pipes/hash-password.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'users.find' })
  find() {
    return this.appService.findAll();
  }

  @MessagePattern({ cmd: 'users.findOne' })
  findOne(@Payload('id') id: string) {
    return this.appService.findOne(id);
  }

  @MessagePattern({ cmd: 'users.findByEmail' })
  findByEmail(@Payload('email') email: string) {
    return this.appService.findByEmail(email);
  }

  @MessagePattern({ cmd: 'users.verifyPassword' })
  verifyPassword(@Payload('password') password: string, @Payload('hashedPassword') hashedPassword: string) {
    return this.appService.verifyPassword(password, hashedPassword);
  }

  @MessagePattern({ cmd: 'users.create' })
  create(@Payload(HashPasswordPipe) createUserDto: CreateUserDto) {
    return this.appService.create(createUserDto);
  }
}
