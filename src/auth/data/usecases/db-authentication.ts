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
    const user = await this.userRepository.findOne({ email: authentication.email })
    if (user) {
      const loginValid = await this.hashComparer.compare(authentication.password, user.password)
      if (loginValid) {
        const accessToken = await this.encrypter.encrypt(user.id.toString())
        await this.userRepository.save({ id: user.id, accessToken })
        return accessToken
      }
    }
    return null
  }
}