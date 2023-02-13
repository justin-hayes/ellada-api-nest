import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationMeta,
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';
import { Artifact } from './entities/artifact.entity';

@Injectable()
export class ArtifactService {
  constructor(
    @InjectRepository(Artifact)
    private readonly artifactRepository: Repository<Artifact>,
  ) {}

  create(createArtifactDto: CreateArtifactDto) {
    return 'This action adds a new artifact';
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Artifact>> {
    return paginate<Artifact>(this.artifactRepository, options);
  }

  async findRandom(): Promise<Artifact> {
    const artifacts = await this.artifactRepository.query(
      'SELECT * FROM artifact TABLESAMPLE SYSTEM_ROWS(1)',
    );
    return artifacts[0];
  }

  async findOne(id: number) {
    return this.artifactRepository.findOne({
      where: { id },
      relations: {
        tags: true,
        classifications: true,
      },
    });
  }

  update(id: number, updateArtifactDto: UpdateArtifactDto) {
    return `This action updates a #${id} artifact`;
  }

  remove(id: number) {
    return `This action removes a #${id} artifact`;
  }
}
