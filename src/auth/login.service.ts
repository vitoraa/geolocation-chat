import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Authentication } from './domain/usecases/authentication';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class LoginService {
  constructor (@Inject('Authentication')
  private authentication: Authentication) { }

  async handle (loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const accessToken = await this.authentication.auth({ email, password });

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return { accessToken };
  }
}
