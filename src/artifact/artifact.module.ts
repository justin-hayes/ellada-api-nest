import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';
import { Tag } from './entities/tag.entity';
import { Classification } from './entities/classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artifact, Tag, Classification])],
  exports: [ArtifactService],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
