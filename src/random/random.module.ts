import { Module } from '@nestjs/common';
import { ArtifactModule } from 'src/artifact/artifact.module';
import { RandomController } from './random.controller';

@Module({
  imports: [ArtifactModule],
  controllers: [RandomController],
})
export class RandomModule {}
