import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CredentialRepository } from './credential.repository';
import Cryptr from "cryptr";
import { CreateCredentialDTO } from './dto/create-credential.dto';

@Injectable()
export class CredentialService {

  private cryptr: Cryptr;

  constructor(private readonly credentialRepository: CredentialRepository) {
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }

  async create(userId: number, credentialDTO: CreateCredentialDTO) {
    const credential = await this.credentialRepository.getByTitle(userId, credentialDTO.title);
    if (credential) throw new ConflictException();

    return await this.credentialRepository.create(userId, {
      ...credentialDTO,
      password: this.cryptr.encrypt(credentialDTO.password)
    })
  }

  async get(userId: number, id: number) {
    const credential = await this.credentialRepository.get(userId, id);
    if (!credential) throw new NotFoundException();

    return {
      ...credential,
      password: this.cryptr.decrypt(credential.password)
    };
  }

  async getAll(userId: number) {
    const credentials = await this.credentialRepository.getAll(userId);
    return credentials.map(credential => {
      return {
        ...credential,
        password: this.cryptr.decrypt(credential.password)
      }
    })
  }

  async delete(userId: number, id: number) {
    await this.get(userId, id);
    return await this.credentialRepository.delete(userId, id);
  }


}