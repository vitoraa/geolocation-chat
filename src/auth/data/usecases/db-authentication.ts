import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Authentication, AuthenticationParams } from "../../domain/usecases/authentication"
import { Encrypter } from "../protocols/criptography/encrypter"
import { HashComparer } from "../protocols/criptography/hash-comparer"
import { LoadUserByEmailRepository } from "../protocols/db/load-user-by-email-repository"
import { UpdateAccessTokenRepository } from "../protocols/db/update-access-token-repository"

@Injectable()
export class DbAuthentication implements Authentication {
  constructor (
    @Inject('LoadUserByEmailRepository')
    private loadUserByEmailRepository: LoadUserByEmailRepository,
    @Inject('UpdateAccessTokenRepository')
    private updateAccessTokenRepository: UpdateAccessTokenRepository,
    @Inject('HashComparer')
    private hashComparer: HashComparer,
    @Inject('Encrypter')
    private readonly encrypter: Encrypter
  ) { }

  async auth (authentication: AuthenticationParams): Promise<string> {
    const user = await this.loadUserByEmailRepository.loadByEmail(authentication.email)
    if (user) {
      const loginValid = await this.hashComparer.compare(authentication.password, user.password)
      if (loginValid) {
        const accessToken = await this.encrypter.encrypt({ name: user.name, email: user.email })
        await this.updateAccessTokenRepository.updateAccessToken(user.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}