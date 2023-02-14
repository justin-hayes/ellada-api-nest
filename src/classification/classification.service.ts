import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Classification } from './entities/classification.entity';

@Injectable()
export class ClassificationService {
  constructor(
    @InjectRepository(Classification)
    private readonly classificationRepository: Repository<Classification>,
  ) {}

  async findAll() {
    return this.classificationRepository.find();
  }

  async findByName(name: string) {
    return this.classificationRepository.findOneByOrFail({
      name,
    });
  }
}
