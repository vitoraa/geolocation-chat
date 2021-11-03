import { BadRequestException, Injectable } from '@nestjs/common';
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
    const userWithTheSameEmail = this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userWithTheSameEmail) {
      throw new BadRequestException('User with the same email already exists');
    }

    return this.userRepository.save(createUserDto)
  }

  update (id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
