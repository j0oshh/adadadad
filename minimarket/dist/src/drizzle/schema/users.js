"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const roles_1 = require("./roles");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nombre: (0, pg_core_1.varchar)('nombre', { length: 100 })
        .notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 150 })
        .notNull()
        .unique(),
    password: (0, pg_core_1.varchar)('password', { length: 255 })
        .notNull(),
    rolId: (0, pg_core_1.integer)('rol_id')
        .notNull()
        .references(() => roles_1.roles.id),
    activo: (0, pg_core_1.boolean)('activo')
        .notNull()
        .default(true),
    eliminado: (0, pg_core_1.boolean)('eliminado').notNull().default(false),
});
//# sourceMappingURL=users.js.map