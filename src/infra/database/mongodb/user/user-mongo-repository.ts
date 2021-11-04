import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AddUserRepository } from "../../../../auth/data/protocols/db/add-user-repository"
import { LoadUserByEmailRepository } from "../../../../auth/data/protocols/db/load-user-by-email-repository"
import { User } from "../../../../auth/entities/user.entity"

@Injectable()
export class UserMongoRepository implements AddUserRepository, LoadUserByEmailRepository {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async add (userData: AddUserRepository.Params): Promise<AddUserRepository.Result> {
    const result: User = await this.userRepository.save(userData)
    return result
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const result: User = await this.userRepository.findOne({ email })
    return result
  }
}
