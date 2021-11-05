import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { AddUser } from './domain/usecases/add-user';
import { Authentication } from './domain/usecases/authentication';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {

  constructor (
    @Inject('AddUser')
    private addUser: AddUser,
    @Inject('Authentication')
    private authentication: Authentication,
  ) { }

  async create (createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto
    try {
      const isValid = await this.addUser.add({ name, email, password, role })

      if (!isValid) {
        return new BadRequestException('User already exists')
      }

      const accessToken = await this.authentication.auth({ email, password })

      return { accessToken }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async login (loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const accessToken = await this.authentication.auth({ email, password });

    if (!accessToken) {
      throw new UnauthorizedException();
    }

    return { accessToken };
  }
}
