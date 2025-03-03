import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { Types } from 'mongoose';

const mockAsset = {
  _id: '507f191e810c19729de860ea',
  name: 'Test Asset',
  amount: 100,
  wallet: new Types.ObjectId("507f191e810c19729de860ea")
};

class MockAssetModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  toJSON = jest.fn().mockImplementation(function () {
    return this.data;
  });
  static find = jest.fn().mockResolvedValue([new MockAssetModel(mockAsset)]);
  static findByEmail = jest.fn().mockResolvedValue(mockAsset);
  static findById = jest.fn().mockResolvedValue(mockAsset);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockAsset);
  static findByIdAndDelete = jest.fn().mockResolvedValue(mockAsset);
}

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockAsset]),
            findById: jest.fn().mockResolvedValue(mockAsset),
            create: jest.fn().mockResolvedValue(mockAsset),
            updateAmount: jest.fn().mockResolvedValue(mockAsset),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('findAll', () => {
    it('should return an array of assets', async () => {
      expect(await appController.findAll()).toEqual([mockAsset]);
    });
  });

  describe('findById', () => {
    it('should return a single asset', async () => {
      expect(await appController.findById(mockAsset._id)).toEqual(mockAsset);
    });
  });

  describe('create', () => {
    it('should create an asset and return', async () => {
      const createAssetDto: CreateAssetDto = { name: mockAsset.name, amount: mockAsset.amount, wallet: mockAsset.wallet };
      expect(await appController.create(createAssetDto)).toEqual(mockAsset);
    });
  });

  describe('update', () => {
    it('should update amount of asset', async () => {
      const { _id, amount } = mockAsset;
      expect(await appController.update({ _id, amount })).toEqual(mockAsset);
    });
  });

  
});
