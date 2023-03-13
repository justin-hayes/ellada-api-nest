import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from '../auth/public.decorator';
import { Role } from '../user/role.enum';
import { Roles } from '../user/roles.decorator';
import { ArtifactService } from './artifact.service';
import { CreateArtifactDto } from './dto/create-artifact.dto';
import { UpdateArtifactDto } from './dto/update-artifact.dto';
import { Artifact, Period } from './entities/artifact.entity';

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
  @ApiQuery({
    name: 'period',
    enum: ['Archaic', 'Classical', 'Hellenistic'],
    required: false,
  })
  @ApiQuery({
    name: 'tag',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'classification',
    type: String,
    required: false,
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('period') period?: Period,
    @Query('tag') tag?: string,
    @Query('classification') classification?: string,
  ): Promise<Pagination<Artifact>> {
    limit = limit > 100 ? 100 : limit;
    return this.artifactService.paginate(
      {
        page,
        limit,
        route: 'http://localhost:3000/artifacts',
      },
      {
        where: {
          period,
          tags: {
            name: tag,
          },
          classifications: {
            name: classification,
          },
        },
      },
    );
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.artifactService.findOne(id);
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
