import { UserEntity } from "../../../../users/user.entity"

export interface AddUserRepository {
  add: (user: AddUserRepository.Params) => Promise<AddUserRepository.Result>
}

export namespace AddUserRepository {
  export type Params = Omit<UserEntity, 'id' | 'accessToken'>
  export type Result = UserEntity
}
