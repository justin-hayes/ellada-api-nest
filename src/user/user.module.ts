import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashingModule],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
