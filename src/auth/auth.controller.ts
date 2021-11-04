import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { SignUpUserService } from './signup.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginService } from './login.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor (private readonly signUpUserService: SignUpUserService, private readonly loginService: LoginService) { }

  @Post('/signup')
  signUp (@Body() createUserDto: CreateUserDto) {
    return this.signUpUserService.handle(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  login (@Body() loginUserDto: LoginUserDto) {
    return this.loginService.handle(loginUserDto);
  }
}
