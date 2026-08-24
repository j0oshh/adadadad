import { pgTable, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),

  nombre: varchar('nombre', { length: 50 })
    .notNull()
    .unique(),

  nivel: integer('nivel')
    .notNull(),
});