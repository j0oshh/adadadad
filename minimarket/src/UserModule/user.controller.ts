import { Body, Controller, Get, Post, } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Get()
  listar() {
    return this.userService.listar();
  }

  @Post()
  crear(
    @Body()
    body: {
      nombre: string;
      email: string;
      password: string;
      rolId: number;
    },
  ) {
    return this.userService.crear(
      body,
    );
  }
}