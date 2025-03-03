import { Body, Controller, Get, HttpException, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { AssetsService } from './assets.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreatedAssetDto } from './dto/created-asset.dto';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('assets')
export class AssetsController {
    constructor(
        @Inject('ASSET_SERVICE') private client: ClientProxy, 
        private readonly assetsService: AssetsService, 
) {}
    
    @ApiOperation({ summary: 'Create an asset' })
    @ApiResponse({ type: CreatedAssetDto, status: 201 })
    @ApiBody({ type: CreateAssetDto })
    @ApiBearerAuth()
    @Post()
    create(@Body() data) {
        return this.client.send({ cmd: 'assets.create' }, data);
    }

    @ApiOperation({ summary: 'Get assets' })
    @ApiResponse({ type: [CreatedAssetDto], status: 200 })
    @ApiParam({ name: "id", allowEmptyValue: false, example: "67812973f949635c9bb9824d" })
    @ApiBearerAuth()
    @Get()
    findAll() {
        return this.client.send({ cmd: 'assets.findAll' }, {});
    }
}
