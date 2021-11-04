import { CreateUserDto } from "../../dto/create-user.dto";

export interface AddAccount {
  add: (account: CreateUserDto) => Promise<boolean>
}