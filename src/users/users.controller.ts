import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { User } from "./user.interface";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async getUserByEmail (@Param('email') email: string): Promise<User> {
    return this.usersService.findOneByEmail(email);
  }
}