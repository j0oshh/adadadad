import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
  ) {}

  @Get()
  listar() {
    return this.rolesService.listar();
  }

  @Get(':id')
  obtener(
    @Param('id') id: string,
  ) {
    return this.rolesService.obtener(
      Number(id),
    );
  }

  @Post()
  crear(
    @Body()
    body: {
      nombre: string;
      nivel: number;
    },
  ) {
    return this.rolesService.crear(
      body.nombre,
      body.nivel,
    );
  }

  @Patch(':id')
  actualizar(
    @Param('id') id: string,

    @Body()
    body: {
      nombre?: string;
      nivel?: number;
    },
  ) {
    return this.rolesService.actualizar(
      Number(id),
      body.nombre,
      body.nivel,
    );
  }

  @Delete(':id')
  eliminar(
    @Param('id') id: string,
  ) {
    return this.rolesService.eliminar(
      Number(id),
    );
  }
}