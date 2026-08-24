import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { eq } from 'drizzle-orm';

import { DrizzleService } from '../drizzle/drizzle.service';

import { roles } from '../drizzle/schema/roles';

@Injectable()
export class RolesService {
  constructor(
    private readonly drizzleService: DrizzleService,
  ) {}

  private get db() {
    return this.drizzleService.getDb();
  }

  async listar() {
    return this.db
      .select()
      .from(roles);
  }

  async obtener(id: number) {
    const resultado = await this.db
      .select()
      .from(roles)
      .where(eq(roles.id, id))
      .limit(1);

    if (!resultado[0]) {
      throw new NotFoundException(
        'Rol no encontrado',
      );
    }

    return resultado[0];
  }

  async crear(
    nombre: string,
    nivel: number,
  ) {
    try {
      const resultado = await this.db
        .insert(roles)
        .values({
          nombre,
          nivel,
        })
        .returning();

      return resultado[0];
    } catch {
      throw new ConflictException(
        'El rol ya existe',
      );
    }
  }

  async actualizar(
    id: number,
    nombre?: string,
    nivel?: number,
  ) {
    await this.obtener(id);

    const resultado = await this.db
      .update(roles)
      .set({
        ...(nombre !== undefined
          ? { nombre }
          : {}),

        ...(nivel !== undefined
          ? { nivel }
          : {}),
      })
      .where(eq(roles.id, id))
      .returning();

    return resultado[0];
  }

  async eliminar(id: number) {
    await this.obtener(id);

    const resultado = await this.db
      .delete(roles)
      .where(eq(roles.id, id))
      .returning();

    return {
      mensaje: 'Rol eliminado correctamente',
      rol: resultado[0],
    };
  }
}