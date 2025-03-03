import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatedUserDto } from './dto/created-user.dto';

@Controller('users')
export class UsersController {
    constructor(@Inject('USERS_SERVICE') private client: ClientProxy) {}
        
    @ApiOperation({ summary: 'Get a users' })
    @ApiResponse({ type: [CreatedUserDto], status: 200 })
    @ApiBearerAuth()
    @Get()
    find(@Body() data){
        return this.client.send({ cmd: 'users.find' }, data);
    }

    @ApiOperation({ summary: 'Get a user' })
    @ApiParam({ name: 'id', type: String, example: '67c399ecb3708c5b7c38e88e' })
    @ApiResponse({ type: CreatedUserDto, status: 200 })
    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param() data){
        return this.client.send({ cmd: 'users.findOne' }, data);
    }

    @ApiOperation({ summary: 'Create a user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ type: CreatedUserDto, status: 201 })
    @ApiBearerAuth()
    @Post()
    create(@Body() data){
        return this.client.send({ cmd: 'users.create' }, data);
    }
}
