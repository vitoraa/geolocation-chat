import { sign } from 'jsonwebtoken'
import { Encrypter } from '../../../../auth/data/protocols/criptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) { }

  async encrypt (value: string): Promise<string> {
    const accessToken = sign({ id: value }, this.secret)
    return accessToken
  }
}