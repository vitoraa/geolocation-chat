import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BCryptAdapter } from '../infra/database/config/criptography/bcrypt-adapter';
import { JwtAdapter } from '../infra/database/config/criptography/jwt-adapter';
import { DbAuthentication } from './data/usecases/db-authentication';
import { DbAddUser } from './data/usecases/db-add-user';
import { UserMongoRepository } from '../infra/database/mongodb/user/user-mongo-repository';
import { SignUpUserService } from './signup.service';
import { LoginService } from './login.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    SignUpUserService,
    LoginService,
    { provide: 'Hasher', useFactory: () => new BCryptAdapter(12) },
    { provide: 'HashComparer', useFactory: () => new BCryptAdapter(12) },
    { provide: 'AddUser', useClass: DbAddUser },
    { provide: 'Authentication', useClass: DbAuthentication },
    { provide: 'Encrypter', useFactory: () => new JwtAdapter('secret') },
    { provide: 'AddUserRepository', useClass: UserMongoRepository },
    { provide: 'LoadUserByEmailRepository', useClass: UserMongoRepository },
  ],

})
export class AuthModule { }
