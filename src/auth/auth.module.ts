import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BCryptAdapter } from '../infra/database/config/criptography/bcrypt-adapter';
import { DbAddAccount } from './data/usecases/db-add-account';
import { JwtAdapter } from '../infra/database/config/criptography/jwt-adapter';
import { DbAuthentication } from './data/usecases/db-authentication';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'Hasher', useFactory: () => new BCryptAdapter(12) },
    { provide: 'HashComparer', useFactory: () => new BCryptAdapter(12) },
    { provide: 'AddAccount', useClass: DbAddAccount },
    { provide: 'Authentication', useClass: DbAuthentication },
    { provide: 'Encrypter', useFactory: () => new JwtAdapter('secret') }],
})
export class AuthModule { }
