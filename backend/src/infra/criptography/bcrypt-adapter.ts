import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt';
import { HashComparer } from '../../auth/data/protocols/criptography/hash-comparer';
import { Hasher } from '../../auth/data/protocols/criptography/hasher';

@Injectable()
export class BCryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) { }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return isValid
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}