import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import SignInDto from './dto/sign-in.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import SignedInDto from './dto/signed-in.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}
    
    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ type: SignedInDto, status: 200 })
    @ApiBody({ type: SignInDto })
    @ApiBearerAuth()
    @Public()
    @Post('login')
    login(@Body() signInDto: SignInDto){
        return this.client.send({ cmd: 'auth.login' }, signInDto);
    }
}
