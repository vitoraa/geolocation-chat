import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hasher } from './data/protocols/criptography/hasher';
import { AddAccount } from './domain/usecases/add-account';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor (
    @Inject('AddAccount')
    private addAccount: AddAccount,
  ) { }

  async create (createUserDto: CreateUserDto) {
    try {
      const isValid = await this.addAccount.add(createUserDto)
      if (!isValid) {
        return new BadRequestException('Invalid data')
      }
      return 'access-token'
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
