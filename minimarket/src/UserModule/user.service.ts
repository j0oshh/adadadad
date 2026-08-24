import { ConflictException, Injectable, } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { users } from '../drizzle/schema/users';

@Injectable()
export class UserService {
  constructor(
    private readonly drizzleService: DrizzleService,
  ) {}

  async listar() {
    const db = this.drizzleService.getDb();

    return db
      .select({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        rolId: users.rolId,
        activo: users.activo,
        eliminado: users.eliminado,
      })
      .from(users);
  }

  async crear(data: {
    nombre: string;
    email: string;
    password: string;
    rolId: number;
  }) {
    const db = this.drizzleService.getDb();

    const usuarioExistente = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email));

    if (usuarioExistente.length > 0) {
      throw new ConflictException(
        'El correo ya está registrado',
      );
    }

    const passwordHash = await bcrypt.hash(
      data.password,
      10,
    );

    const resultado = await db
      .insert(users)
      .values({
        nombre: data.nombre,
        email: data.email,
        password: passwordHash,
        rolId: data.rolId,
        activo: true,
        eliminado: false,
      })
      .returning({
        id: users.id,
        nombre: users.nombre,
        email: users.email,
        rolId: users.rolId,
        activo: users.activo,
        eliminado: users.eliminado,
      });

    return resultado[0];
  }
}