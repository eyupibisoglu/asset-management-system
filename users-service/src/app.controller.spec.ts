import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const mockUser = {
  _id: '507f191e810c19729de860ea',
  email: 'test@example.com',
  name: 'Test User',
  password: 'hashedpassword',
};

class MockUserModel {
  constructor(private data) {
    Object.assign(this, data);
  }
  save = jest.fn().mockResolvedValue(this.data);
  toJSON = jest.fn().mockImplementation(function () {
    return this.data;
  });
  static find = jest.fn().mockResolvedValue([new MockUserModel(mockUser)]);
  static findByEmail = jest.fn().mockResolvedValue(mockUser);
  static findById = jest.fn().mockResolvedValue(mockUser);
  static findByIdAndUpdate = jest.fn().mockResolvedValue(mockUser);
  static findByIdAndDelete = jest.fn().mockResolvedValue(mockUser);
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
            findAll: jest.fn().mockResolvedValue([mockUser]),
            findByEmail: jest.fn().mockResolvedValue(mockUser),
            verifyPassword: jest.fn().mockResolvedValue(mockUser),
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await appController.find()).toEqual([mockUser]);
    });
  });

  describe('findByEmail', () => {
    it('should return an array of users', async () => {
      expect(await appController.findByEmail(mockUser.email)).toEqual(mockUser);
    });
  });

  describe('verifyPassword', () => {
    it('should verify', async () => {
      expect(await appController.verifyPassword(mockUser.password, mockUser.password)).toEqual(mockUser);
    });
  });
});
