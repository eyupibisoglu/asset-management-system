import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { lastValueFrom, NotFoundError, Observable } from 'rxjs';
import { UserId } from 'src/common/decorators/user-id.decorator';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { CreatedWalletDto } from './dto/created-wallet.dto';

@Controller('wallets')
export class WalletsController {
    constructor(@Inject('WALLET_SERVICE') private client: ClientProxy) {}

    @ApiOperation({ summary: 'Create a wallet' })
    @ApiBody({ type: CreateWalletDto })
    @ApiResponse({ type: CreatedWalletDto, status: 201 })
    @ApiBearerAuth()
    @Post()
    create(@Body() data, @UserId() userId) {
        data.user = userId;
        return this.client.send({ cmd: 'wallets.create' }, data);
    }

    @ApiOperation({ summary: 'Get a wallet' })
    @ApiParam({ name: 'id', type: String, example: '67c399ecb3708c5b7c38e88e' })
    @ApiResponse({ type: CreatedWalletDto, status: 200 })
    @ApiBearerAuth()
    @Get(':id')
    async findOne(@Param() data, @UserId() userId){
        const wallet = await lastValueFrom(this.client.send({ cmd: 'wallets.findOne' }, data));

        if (!wallet)
            throw new NotFoundException();

        if( wallet.user != userId){
            throw new UnauthorizedException();
        }

        return wallet;
    }

    @ApiOperation({ summary: 'Delete a wallet' })
    @ApiParam({ name: 'id', type: String, example: '67c399ecb3708c5b7c38e88e' })
    @ApiResponse({ status: 200 })
    @ApiBearerAuth()
    @Delete(':id')
    delete(@Param() data) {
        return this.client.send({ cmd: 'wallets.delete' }, data);
    }
}
