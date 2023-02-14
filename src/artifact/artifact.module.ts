import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';
import { TagModule } from '../tag/tag.module';
import { ClassificationModule } from '../classification/classification.module';

@Module({
  imports: [
    TagModule,
    ClassificationModule,
    TypeOrmModule.forFeature([Artifact]),
  ],
  exports: [ArtifactService],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
