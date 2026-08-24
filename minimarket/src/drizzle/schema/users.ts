import { pgTable, serial, varchar, boolean, integer, } from 'drizzle-orm/pg-core';
import { roles } from './roles';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  nombre: varchar('nombre', { length: 100 })
    .notNull(),

  email: varchar('email', { length: 150 })
    .notNull()
    .unique(),

  password: varchar('password', { length: 255 })
    .notNull(),

  rolId: integer('rol_id')
    .notNull()
    .references(() => roles.id),

  activo: boolean('activo')
    .notNull()
    .default(true),

  eliminado: boolean('eliminado').notNull().default(false),  
});