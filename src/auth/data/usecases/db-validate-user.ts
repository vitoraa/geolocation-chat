import { Inject, Injectable } from "@nestjs/common"
import { UserEntity } from "../../../users/user.entity"
import { ValidateUser } from "../../domain/usecases/validate-user"
import { HashComparer } from "../protocols/criptography/hash-comparer"
import { LoadUserByEmailRepository } from "../protocols/db/load-user-by-email-repository"

@Injectable()
export class DbValidateUser implements ValidateUser {
  constructor (
    @Inject('LoadUserByEmailRepository')
    private loadUserByEmailRepository: LoadUserByEmailRepository,
    @Inject('HashComparer')
    private hashComparer: HashComparer,
  ) { }

  async validate (email: string, password: string): Promise<UserEntity> {
    const user = await this.loadUserByEmailRepository.loadByEmail(email)
    if (user) {
      const isLoginValid = await this.hashComparer.compare(password, user.password)
      if (isLoginValid) return user
    }
    return null
  }
}