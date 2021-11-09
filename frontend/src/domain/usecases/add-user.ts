import { UserModel } from "../models/user-model"

export interface AddUser {
  add: (params: AddUser.Params) => Promise<AddUser.Model>
}

export namespace AddUser {
  export type Params = {
    email: string
    password: string
    passwordConfirmation: string
    name: string
    role: string
  }

  export type Model = UserModel
}
