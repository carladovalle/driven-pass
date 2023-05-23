import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { LoggedUser } from 'src/decorators/user.decorator';
import { User } from '@prisma/client';
import { CreateCredentialDTO } from './dto/create-credential.dto';

@Controller('credentials')
@UseGuards(AuthGuard)
export class CredentialController {

  constructor(private readonly credentialService: CredentialService) { }

  @Post()
  async create(@LoggedUser() user: User, @Body() credentialDTO: CreateCredentialDTO) {
    await this.credentialService.create(user.id, credentialDTO);
  }

  @Get(":id")
  async get(@LoggedUser() user: User, @Param("id", ParseIntPipe) id: number) {
    return await this.credentialService.get(user.id, id);
  }

  @Get()
  async getAll(@LoggedUser() user: User) {
    return await this.credentialService.getAll(user.id);
  }

  @Delete(":id")
  async delete(@LoggedUser() user: User, @Param("id", ParseIntPipe) id: number) {
    return await this.credentialService.delete(user.id, id);
  }

}