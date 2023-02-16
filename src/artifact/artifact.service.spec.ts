import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ArtifactService } from './artifact.service';
import { Artifact } from './entities/artifact.entity';

const testArtifact = getArtifact(1);

describe('ArtifactService', () => {
  let service: ArtifactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArtifactService,
        {
          provide: getRepositoryToken(Artifact),
          useValue: {
            async findOne() {
              return testArtifact;
            },
          },
        },
      ],
    }).compile();

    service = module.get<ArtifactService>(ArtifactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find one artifact', async () => {
    const result = await service.findOne(1);
    expect(result).toBe(testArtifact);
  });
});

function getArtifact(id: number): Artifact {
  return {
    id,
    extId: 'extId',
    name: 'name',
    title: 'title',
    period: 'period',
    date: 'date',
    beginDate: 100,
    endDate: 200,
    imageId: '1',
    tags: [{ id: 1, name: 'tag' }],
    classifications: [{ id: 1, name: 'classification' }],
  };
}
