import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UsersService } from "../../../users/users.service"
import { Authentication, AuthenticationParams } from "../../domain/usecases/authentication"
import { Encrypter } from "../protocols/criptography/encrypter"
import { HashComparer } from "../protocols/criptography/hash-comparer"

@Injectable()
export class DbAuthentication implements Authentication {
  constructor (
    private usersService: UsersService,
    @Inject('HashComparer')
    private hashComparer: HashComparer,
    @Inject('Encrypter')
    private readonly encrypter: Encrypter
  ) { }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const user = await this.usersService.findOneByEmail(authentication.email)
    if (user) {
      const loginValid = await this.hashComparer.compare(authentication.password, user.password)
      if (loginValid) {
        const accessToken = await this.encrypter.encrypt(user.id.toString())
        await this.usersService.update(user.id, { accessToken })
        return accessToken
      }
    }
    return null
  }
}