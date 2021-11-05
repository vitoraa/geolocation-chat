import { UserEntity } from "../../../users/user.entity";

export interface ValidateUser {
  validate: (email: string, password: string) => Promise<UserEntity>
}