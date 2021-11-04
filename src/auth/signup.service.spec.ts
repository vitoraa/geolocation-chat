import { Test, TestingModule } from '@nestjs/testing';
import { SignUpUserService } from './signup.service';

describe('SignUpUserService', () => {
  let service: SignUpUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SignUpUserService],
    }).compile();

    service = module.get<SignUpUserService>(SignUpUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
