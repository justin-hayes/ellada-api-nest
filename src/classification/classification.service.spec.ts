import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClassificationService } from './classification.service';
import { Classification } from './entities/classification.entity';

describe('ClassificationService', () => {
  let service: ClassificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassificationService,
        {
          provide: getRepositoryToken(Classification),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ClassificationService>(ClassificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
