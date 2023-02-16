import { Test, TestingModule } from '@nestjs/testing';
import { ArtifactService } from '../artifact/artifact.service';
import { RandomController } from './random.controller';

describe('RandomController', () => {
  let controller: RandomController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RandomController],
      providers: [
        {
          provide: ArtifactService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<RandomController>(RandomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
