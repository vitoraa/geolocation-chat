import { Controller, Get, Param } from "@nestjs/common";
import { User } from "./user.interface";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Get('email/:email')
  async getUserByEmail (@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}