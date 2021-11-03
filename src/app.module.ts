import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './infra/database/config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig()),
    AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
