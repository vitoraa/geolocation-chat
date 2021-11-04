import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { User } from "../../entities/user.entity"
import { Hasher } from "../protocols/criptography/hasher"
import { CreateUserDto } from '../../dto/create-user.dto'
import { AddUser } from "../../domain/usecases/add-user"
import { AddUserRepository } from "../protocols/db/add-user-repository"
import { LoadUserByEmailRepository } from "../protocols/db/load-user-by-email-repository"

@Injectable()
export class DbAddUser implements AddUser {
  constructor (
    @Inject('Hasher')
    private hasher: Hasher,
    @Inject('AddUserRepository')
    private addUserRepository: AddUserRepository,
    @Inject('LoadUserByEmailRepository')
    private loadUserByEmailRepository: LoadUserByEmailRepository
  ) { }

  async add (user: CreateUserDto): Promise<boolean> {
    const { email, password } = user
    const userWithSameEmail = await this.loadUserByEmailRepository.loadByEmail(email);
    let userCreated: User = null
    if (!userWithSameEmail) {
      const hashedPassword = await this.hasher.hash(password)
      userCreated = await this.addUserRepository.add({ ...user, password: hashedPassword })
    }
    return userCreated !== null
  }
}