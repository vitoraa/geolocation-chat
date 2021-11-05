import { Inject, Injectable } from "@nestjs/common"
import { Authentication, AuthenticationParams } from "../../domain/usecases/authentication"
import { ValidateUser } from "../../domain/usecases/validate-user"
import { Encrypter } from "../protocols/criptography/encrypter"
import { HashComparer } from "../protocols/criptography/hash-comparer"
import { LoadUserByEmailRepository } from "../protocols/db/load-user-by-email-repository"
import { UpdateAccessTokenRepository } from "../protocols/db/update-access-token-repository"

@Injectable()
export class DbAuthentication implements Authentication {
  constructor (
    @Inject('UpdateAccessTokenRepository')
    private updateAccessTokenRepository: UpdateAccessTokenRepository,
    @Inject('Encrypter')
    private readonly encrypter: Encrypter,
    @Inject('ValidateUser')
    private readonly validateUser: ValidateUser
  ) { }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const user = await this.validateUser.validate(authentication.email, authentication.password)
    if (user) {
      const accessToken = await this.encrypter.encrypt({ name: user.name, email: user.email })
      await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
      return accessToken
    }
    return null
  }
}