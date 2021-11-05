import { UserEntity } from "../../../users/user.entity";

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = Omit<UserEntity, 'id'>
  export type Result = UserEntity
}