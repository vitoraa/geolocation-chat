import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) { }

  @Post('/signup')
  createUser (@Body() user: CreateUserDto) {
    return this.authService.create(user);
  }

  @HttpCode(200)
  @Post('/login')
  login (@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
