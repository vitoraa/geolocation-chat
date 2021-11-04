import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SignUpUserService } from './signup.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let service: SignUpUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [SignUpUserService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<SignUpUserService>(SignUpUserService);
  });
});
