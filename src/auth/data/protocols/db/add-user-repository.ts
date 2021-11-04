import { CreateUserDto } from "../../../dto/create-user.dto"
import { User } from "../../../entities/user.entity"

export interface AddUserRepository {
  add: (user: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = Omit<User, 'id'>
  export type Result = User
}
