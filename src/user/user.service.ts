import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/hashing/hashing.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Role } from './role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.password = await this.hashingService.hash(createUserDto.password);
      user.role = Role.User;

      await this.userRepository.save(user);
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException();
      }
      throw err;
    }
  }

  async findOne(email: string): Promise<User> {
    return this.userRepository.findOneByOrFail({
      email,
    });
  }
}
