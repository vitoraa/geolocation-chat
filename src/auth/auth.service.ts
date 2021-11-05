import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserEntity } from '../users/user.entity';
import { User } from '../users/user.interface';
import { AddUser } from './domain/usecases/add-user';
import { Authentication } from './domain/usecases/authentication';

@Injectable()
export class AuthService {

  constructor (
    @Inject('AddUser')
    private addUser: AddUser,
    @Inject('Authentication')
    private authentication: Authentication,
  ) { }

  async create (createUserDto: CreateUserDto) {
    const { email, password } = createUserDto

    const user: User = await this.addUser.add(createUserDto)

    if (!user) {
      throw new BadRequestException('User already exists')
    }

    const accessToken = await this.authentication.auth({ email, password })

    const newUser = new UserEntity()
    newUser.name = user.name
    newUser.email = user.email

    return { user: newUser, accessToken }
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
