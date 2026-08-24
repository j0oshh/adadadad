import { Injectable, UnauthorizedException, } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { eq } from 'drizzle-orm';
import { DrizzleService } from '../drizzle/drizzle.service';
import { users } from '../drizzle/schema/users';

@Injectable()
export class AuthService {
  constructor(
    private readonly drizzleService: DrizzleService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ) {
    const db =
      this.drizzleService.getDb();

    const resultado = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const usuario = resultado[0];

    if (!usuario) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    if (
      !usuario.activo ||
      usuario.eliminado
    ) {
      throw new UnauthorizedException(
        'El usuario está desactivado',
      );
    }

    const passwordCorrecta =
      await bcrypt.compare(
        password,
        usuario.password,
      );

    if (!passwordCorrecta) {
      throw new UnauthorizedException(
        'Correo o contraseña incorrectos',
      );
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rolId: usuario.rolId,
    };

    const token =
      await this.jwtService.signAsync(
        payload,
      );

    return {
      access_token: token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rolId: usuario.rolId,
      },
    };
  }
}