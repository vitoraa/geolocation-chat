import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const validCreateUserDTO: CreateUserDto = {
    userName: 'test',
    password: 'test',
    passwordConfirmation: 'test',
    email: 'email@email.com',
    role: 'user'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call the service on create user', () => {
    const spyService = jest.spyOn(service, 'signUp')
    controller.create(validCreateUserDTO);
    expect(spyService).toHaveBeenCalled();
  });

  it('should call service with correct values', () => {
    const addSpy = jest.spyOn(service, 'signUp');
    controller.create(validCreateUserDTO);
    expect(addSpy).toHaveBeenCalledWith(validCreateUserDTO);
  })
});
