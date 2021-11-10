import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) { }

  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post('/signup')
  createUser (@Body() user: CreateUserDto) {
    const response = this.authService.create(user);
    return response;
  }

  @ApiResponse({ status: 200, description: 'Login done' })
  @ApiResponse({ status: 401, description: 'Login invalid' })
  @HttpCode(200)
  @Post('/login')
  login (@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}
