import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) { }

  @Post('/signup')
  createUser (@Body() user: CreateUserDto) {
    const response = this.authService.create(user);
    return response;
  }

  @HttpCode(200)
  @Post('/login')
  login (@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
