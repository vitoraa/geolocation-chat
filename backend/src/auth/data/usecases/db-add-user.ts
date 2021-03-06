import { Inject, Injectable } from "@nestjs/common"
import { Hasher } from "../protocols/criptography/hasher"
import { AddUser } from "../../domain/usecases/add-user"
import { AddUserRepository } from "../protocols/db/add-user-repository"
import { LoadUserByEmailRepository } from "../protocols/db/load-user-by-email-repository"
import { UserEntity } from "../../../users/user.entity"
import { CreateUserDto } from "../../../users/dto/create-user.dto"
import { UsersService } from "../../../users/users.service"

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

  async add (user: CreateUserDto): Promise<UserEntity> {
    const { email, password } = user
    const userWithSameEmail = await this.loadUserByEmailRepository.loadByEmail(email);
    let userCreated: UserEntity = null
    if (!userWithSameEmail) {
      const { passwordConfirmation, ...userWithoutFileds } = user
      const hashedPassword = await this.hasher.hash(password)
      const userToBeCreated = Object.assign({}, userWithoutFileds, { password: hashedPassword })
      userCreated = await this.addUserRepository.add(userToBeCreated)
    }
    return userCreated
  }
}