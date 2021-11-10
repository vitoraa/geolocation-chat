import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('POST /signup', () => {
    test('Should return 201 on signup', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          name: 'Vitor',
          email: 'vitor2@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(201)
    });
  })
});
