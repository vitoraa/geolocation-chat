import { Inject, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { AddAccount } from "../../domain/usecases/add-account"
import { User } from "../../entities/user.entity"
import { Hasher } from "../protocols/criptography/hasher"
import { CreateUserDto } from '../../dto/create-user.dto'
import { AccountModel } from "../../domain/models/account"

@Injectable()
export class DbAddAccount implements AddAccount {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject('Hasher')
    private hasher: Hasher
  ) { }

  async add (account: CreateUserDto): Promise<boolean> {
    const accountWithSameEmail = await this.userRepository.findOne({ email: account.email });
    let accountCreated = null
    if (!accountWithSameEmail) {
      const hashedPassword = await this.hasher.hash(account.password)
      accountCreated = await this.userRepository.insert({ ...account, password: hashedPassword })
    }
    return accountCreated !== null
  }
}