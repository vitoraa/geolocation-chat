import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Authentication, AuthenticationParams } from "../../domain/usecases/authentication"
import { User } from "../../entities/user.entity"
import { Encrypter } from "../protocols/criptography/encrypter"
import { HashComparer } from "../protocols/criptography/hash-comparer"

@Injectable()
export class DbAuthentication implements Authentication {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('HashComparer')
    private hashComparer: HashComparer,
    @Inject('Encrypter')
    private readonly encrypter: Encrypter
  ) { }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const account = await this.userRepository.findOne({ email: authentication.email })
    if (account) {
      const loginValid = await this.hashComparer.compare(authentication.password, account.password)
      if (loginValid) {
        const accessToken = await this.encrypter.encrypt(account.id.toString())
        await this.userRepository.save({ id: account.id, accessToken })
        return accessToken
      }
    }
    return null
  }
}