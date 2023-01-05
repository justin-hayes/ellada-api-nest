import { Module } from '@nestjs/common';
import { ArtifactService } from './artifact.service';
import { ArtifactController } from './artifact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artifact } from './entities/artifact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artifact])],
  controllers: [ArtifactController],
  providers: [ArtifactService],
})
export class ArtifactModule {}
