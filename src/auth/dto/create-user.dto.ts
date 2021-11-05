import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../../shared/user-roles';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  passwordConfirmation: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: UserRoles;
}
