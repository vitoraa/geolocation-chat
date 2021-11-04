import { BadRequestException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddUser } from './domain/usecases/add-user';
import { Authentication } from './domain/usecases/authentication';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class SignUpUserService {

  constructor (
    @Inject('AddUser')
    private addUser: AddUser,
    @Inject('Authentication')
    private authentication: Authentication,
  ) { }

  async handle (createUserDto: CreateUserDto) {
    const { name, email, password, role } = createUserDto
    try {
      const isValid = await this.addUser.add({ name, email, password, role })

      if (!isValid) {
        return new BadRequestException('Invalid data')
      }

      const accessToken = await this.authentication.auth({ email, password })

      return { accessToken }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
