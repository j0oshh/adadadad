import { pgTable, serial, integer, unique, } from 'drizzle-orm/pg-core';
import { roles } from './roles';
import { permisos } from './permisos';

export const rolesPermisos = pgTable(
  'roles_permisos',
  {
    id: serial('id').primaryKey(),

    rolId: integer('rol_id')
      .notNull()
      .references(() => roles.id, {
        onDelete: 'cascade',
      }),

    permisoId: integer('permiso_id')
      .notNull()
      .references(() => permisos.id, {
        onDelete: 'cascade',
      }),
  },

  (table) => ({
    rolPermisoUnico: unique().on(
      table.rolId,
      table.permisoId,
    ),
  }),
);