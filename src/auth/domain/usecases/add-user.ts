import { User } from "../../entities/user.entity";

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = Omit<User, 'id'>
  export type Result = boolean
}