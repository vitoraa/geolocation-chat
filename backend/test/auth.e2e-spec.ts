import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ormConfig } from '../src/infra/database/config/ormconfig';
import { UserEntity } from '../src/users/user.entity';
import { AuthModule } from '../src/auth/auth.module';
import { hash } from 'bcrypt'
import { environment } from '../src/environment';

describe('', () => {
  let app: INestApplication;
  let repository: Repository<UserEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule,
        TypeOrmModule.forRoot(ormConfig()),],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    repository = moduleFixture.get('UserEntityRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await repository.delete({});
  });

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'Vitor',
          email: 'vitor3@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    });
  })

  describe('POST /login', () => {
    test('Should return 401 on login', async () => {
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'vitor2@gmail.com',
          password: 'wrong_password',
        })
        .expect(401)
    });

    test('Should return 200 on login', async () => {
      const password = await hash('123', parseInt(environment.saltNumber))
      await repository.save({
        name: 'teste',
        email: 'email@email.com',
        password: password,
        passwordConfirmation: password
      });

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'email@email.com',
          password: '123',
        })
        .expect(200)
    });
  })
});
