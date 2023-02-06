import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  findAll() {
    return this.artifactRepository.find();
  }

  findOne(id: number) {
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
