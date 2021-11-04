import { AccountModel } from "../../../domain/models/account"
import { CreateUserDto } from "../../../dto/create-user.dto"

export interface AddAccountRepository {
  add: (account: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = CreateUserDto
  export type Result = AccountModel
}
