import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDtoType } from './dto/register.dto';
import { AuthEntity } from './entity/auth.entity';
import { LoginDtoType } from './dto/login.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDtoType) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async login(@Body() loginDto: LoginDtoType) {
    return this.authService.login(loginDto);
  }
}
