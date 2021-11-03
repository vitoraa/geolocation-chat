import { IsEmail, IsNotEmpty } from 'class-validator';

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
  role: string;
}
