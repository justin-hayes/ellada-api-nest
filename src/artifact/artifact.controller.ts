import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/user/role.enum';
import { Roles } from 'src/user/roles.decorator';
import { ArtifactService } from './artifact.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';

@Controller('artifact')
export class ArtifactController {
  constructor(private readonly artifactService: ArtifactService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createArtifactDto: CreateArtifactDto) {
    return this.artifactService.create(createArtifactDto);
  }

  @Public()
  @Get()
  findAll() {
    return this.artifactService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artifactService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateArtifactDto: UpdateArtifactDto,
  ) {
    return this.artifactService.update(+id, updateArtifactDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artifactService.remove(+id);
  }
}
