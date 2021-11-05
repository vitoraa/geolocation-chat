import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbAuthentication } from './data/usecases/db-authentication';
import { DbAddUser } from './data/usecases/db-add-user';
import { UserMongoRepository } from '../infra/database/mongodb/user/user-mongo-repository';
import { AuthService } from './auth.service';
import { environment } from '../environment';
import { BCryptAdapter } from '../infra/criptography/bcrypt-adapter';
import { JwtAdapter } from '../infra/criptography/jwt-adapter';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../infra/criptography/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/user.entity';

@Module({
  imports: [PassportModule,
    JwtModule.register({
      secret: environment.jwtSecret,
      signOptions: { expiresIn: '1h' },
    }), UsersModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JwtAdapter,
    { provide: 'Hasher', useFactory: () => new BCryptAdapter(parseInt(environment.saltNumber)) },
    { provide: 'HashComparer', useFactory: () => new BCryptAdapter(parseInt(environment.saltNumber)) },
    { provide: 'AddUser', useClass: DbAddUser },
    { provide: 'Authentication', useClass: DbAuthentication },
    { provide: 'Encrypter', useClass: JwtAdapter },
    { provide: 'AddUserRepository', useClass: UserMongoRepository },
    { provide: 'LoadUserByEmailRepository', useClass: UserMongoRepository },
  ],

})
export class AuthModule { }
