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
import { Pagination } from 'nestjs-typeorm-paginate';
import { Public } from 'src/auth/public.decorator';
import { Role } from 'src/user/role.enum';
import { Roles } from 'src/user/roles.decorator';
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
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('period') period: Period,
    @Query('tag') tag: string,
    @Query('classification') classification: string,
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
