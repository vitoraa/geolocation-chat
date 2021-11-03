import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  create (createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto)
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
