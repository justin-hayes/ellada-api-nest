import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get()
  async findAll() {
    const tags = await this.tagService.findAll();
    return tags.map((t) => t.name);
  }
}
