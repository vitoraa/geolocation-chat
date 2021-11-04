import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "../../entities/user.entity"
import { Hasher } from "../protocols/criptography/hasher"
import { CreateUserDto } from '../../dto/create-user.dto'
import { AddUser } from "../../domain/usecases/add-user"

@Injectable()
export class DbAddUser implements AddUser {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('Hasher')
    private hasher: Hasher
  ) { }

  async add (user: CreateUserDto): Promise<boolean> {
    const userWithSameEmail = await this.userRepository.findOne({ email: user.email });
    let userCreated = null
    if (!userWithSameEmail) {
      const hashedPassword = await this.hasher.hash(user.password)
      userCreated = await this.userRepository.insert({ ...user, password: hashedPassword })
    }
    return userCreated !== null
  }
}