import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { ClassificationService } from './classification.service';

@Controller('classification')
export class ClassificationController {
  constructor(private readonly classificationService: ClassificationService) {}

  @Public()
  @Get()
  async findAll() {
    const classifications = await this.classificationService.findAll();
    return classifications.map((c) => c.name);
  }
}
