import { BadRequestException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UserEntity } from '../users/user.entity';
import { User } from '../users/user.interface';
import { AddUser } from './domain/usecases/add-user';
import { Authentication } from './domain/usecases/authentication';
import { ValidateUser } from './domain/usecases/validate-user';

@Injectable()
export class AuthService {

  constructor (
    @Inject('AddUser')
    private addUser: AddUser,
    @Inject('Authentication')
    private authentication: Authentication,
    @Inject('ValidateUser')
    private validateUser: ValidateUser,
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

  async validate (email: string, password: string): Promise<UserEntity> {
    const user = await this.validateUser.validate(email, password)

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
