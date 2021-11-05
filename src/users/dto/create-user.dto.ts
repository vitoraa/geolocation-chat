import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from '../../shared/user-roles';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: UserRoles;
}
