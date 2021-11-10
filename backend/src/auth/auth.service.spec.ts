import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DbAddUser } from './data/usecases/db-add-user';
import { DbAuthentication } from './data/usecases/db-authentication';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {

    const AddUserProvider = {
      provide: 'AddUser',
      useFactory: () => ({
        add: jest.fn(() => null)
      }),
    };

    const AuthenticationProvider = {
      provide: 'Authentication',
      useFactory: () => ({
        auth: jest.fn(() => null)
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, AddUserProvider, AuthenticationProvider],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });
});
