import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BCryptAdapter } from '../infra/database/config/criptography/bcrypt-adapter';
import { DbAddAccount } from './data/usecases/db-add-account';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: 'Hasher', useFactory: () => new BCryptAdapter(12) },
    { provide: 'AddAccount', useClass: DbAddAccount }],
})
export class AuthModule { }
