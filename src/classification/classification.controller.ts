import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/public.decorator';
import { ClassificationService } from './classification.service';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Public()
  @Get()
  async findAll() {
    return this.classificationService.findAll();
  }
}
