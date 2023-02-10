import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtifactModule } from './artifact/artifact.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HashingModule } from './hashing/hashing.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ArtifactModule,
    AuthModule,
    UserModule,
    HashingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
