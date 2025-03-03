import { Test, TestingModule } from '@nestjs/testing';
import { AssetsTaskController } from './assets-task.controller';

describe('AssetsTaskController', () => {
  let controller: AssetsTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsTaskController],
    }).compile();

    controller = module.get<AssetsTaskController>(AssetsTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
