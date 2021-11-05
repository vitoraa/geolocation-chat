import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { UserRoles } from '../../shared/user-roles';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly username?: string;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly verified?: boolean;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  @IsOptional()
  readonly role?: UserRoles;

  @IsBoolean()
  @IsNotEmpty()
  @IsOptional()
  readonly accessToken?: string;
}