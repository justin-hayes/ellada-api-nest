import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService, UserAuth } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserAuth }) {
    return this.authService.login(req.user);
  }
}
