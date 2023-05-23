import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCredentialDTO } from './dto/create-credential.dto';

@Injectable()
export class CredentialRepository {
  constructor(private readonly prisma: PrismaService) { }

  create(userId: number, credentialDTO: CreateCredentialDTO) {
    return this.prisma.credential.create({
      data: {
        userId,
        ...credentialDTO
      }
    })
  }

  get(userId: number, id: number) {
    return this.prisma.credential.findFirst({
      where: {
        userId, id
      }
    })
  }

  getByTitle(userId: number, title: string) {
    return this.prisma.credential.findFirst({
      where: {
        userId, title
      }
    })
  }

  getAll(userId: number) {
    return this.prisma.credential.findMany({
      where: { userId }
    })
  }

  delete(userId: number, id: number) {
    return this.prisma.credential.delete({
      where: { id },
    })
  }

}