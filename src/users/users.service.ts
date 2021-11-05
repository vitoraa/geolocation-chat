import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findOneByEmail (email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async update (id: number | string, newUser: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate = await this.userRepository.findOne(id);
    return await this.userRepository.merge(userToUpdate, newUser);
  }
}