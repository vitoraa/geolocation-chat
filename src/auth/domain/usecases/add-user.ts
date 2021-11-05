import { CreateUserDto } from "../../../users/dto/create-user.dto";
import { UserEntity } from "../../../users/user.entity";

export interface AddUser {
  add: (user: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = CreateUserDto
  export type Result = UserEntity
}