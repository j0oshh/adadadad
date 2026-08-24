import { pgTable, serial, varchar, text } from 'drizzle-orm/pg-core';

export const permisos = pgTable('permisos', {
  id: serial('id').primaryKey(),

  nombre: varchar('nombre', { length: 100 })
    .notNull()
    .unique(),

  descripcion: text('descripcion'),
});