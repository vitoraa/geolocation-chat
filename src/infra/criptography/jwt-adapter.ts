import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Encrypter } from '../../auth/data/protocols/criptography/encrypter'

@Injectable()
export class JwtAdapter implements Encrypter {
  constructor (private jwtService: JwtService) { }

  async encrypt (value: string): Promise<string> {
    const accessToken = this.jwtService.sign({ id: value })
    return accessToken
  }
}