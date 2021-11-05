import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { User } from "./user.interface";

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async findOneByEmail (email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
}