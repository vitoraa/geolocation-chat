import { Test, TestingModule } from '@nestjs/testing';
import { UserRoles } from '../shared/user-roles';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const makeFakeCreateUserRequest = (): CreateUserDto => ({
  email: 'any_email@email.com',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  name: 'any name',
  role: UserRoles.USER
})

const makeFakeLoginRequest = (): LoginUserDto => ({
  email: 'any_email@email.com',
  password: 'any_password'
})

describe('AuthController', () => {
  let controller: AuthController;
  let spyService: AuthService;

  beforeEach(async () => {

    const AuthServiceProvider = {
      provide: AuthService,
      useFactory: () => ({
        login: jest.fn(() => null),
        create: jest.fn(() => null),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceProvider],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    spyService = module.get<AuthService>(AuthService);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    test('should call AuthService with corrects params', async () => {
      const loginSpy = jest.spyOn(spyService, 'login')
      controller.login(makeFakeLoginRequest())
      expect(loginSpy).toHaveBeenCalledWith(makeFakeLoginRequest())
    });
  });

  describe('createUser', () => {
    test('should call AuthService with corrects params', async () => {
      const loginSpy = jest.spyOn(spyService, 'create')
      controller.createUser(makeFakeCreateUserRequest())
      expect(loginSpy).toHaveBeenCalledWith(makeFakeCreateUserRequest())
    });
  });
});
