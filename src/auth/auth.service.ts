import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingService } from '../hashing/hashing.service';
import { UserService } from '../user/user.service';
import jwtConfig from './jwt.config';

export type UserAuth = {
  id: number;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashingService: HashingService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserAuth | null> {
    const user = await this.userService.findOne(email);
    if (user && (await this.hashingService.compare(password, user.password))) {
      return { id: user.id, email };
    }
    return null;
  }

  async login(user: UserAuth) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        audience: this.jwtConf.audience,
        issuer: this.jwtConf.issuer,
        secret: this.jwtConf.secret,
        expiresIn: this.jwtConf.accessTokenTtl,
      }),
    };
  }
}
