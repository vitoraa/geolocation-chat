import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hasher } from './data/protocols/criptography/hasher';
import { AddUser } from './domain/usecases/add-user';
import { Authentication } from './domain/usecases/authentication';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor (
    @Inject('AddUser')
    private addUser: AddUser,
    @Inject('Authentication')
    private authentication: Authentication
  ) { }

  async create (createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto
    try {
      const isValid = await this.addUser.add({ name, email, password, role })
      if (!isValid) {
        return new BadRequestException('Invalid data')
      }

      const accessToken = await this.authentication.auth({ email, password })
      return accessToken
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
