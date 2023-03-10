import { Controller, Get } from '@nestjs/common';
import { ArtifactService } from '../artifact/artifact.service';
import { Public } from '../auth/public.decorator';

@Controller('random')
export class RandomController {
  constructor(private readonly artifactService: ArtifactService) {}

  @Public()
  @Get('artifact')
  async getRandomArtifact() {
    return this.artifactService.findRandom();
  }
}
