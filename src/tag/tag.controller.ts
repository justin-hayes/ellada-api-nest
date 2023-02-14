import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Public()
  @Get()
  async findAll() {
    return this.tagService.findAll();
  }
}
