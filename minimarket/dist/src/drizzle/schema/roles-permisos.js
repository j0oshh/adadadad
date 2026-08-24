"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolesPermisos = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const roles_1 = require("./roles");
const permisos_1 = require("./permisos");
exports.rolesPermisos = (0, pg_core_1.pgTable)('roles_permisos', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    rolId: (0, pg_core_1.integer)('rol_id')
        .notNull()
        .references(() => roles_1.roles.id, {
        onDelete: 'cascade',
    }),
    permisoId: (0, pg_core_1.integer)('permiso_id')
        .notNull()
        .references(() => permisos_1.permisos.id, {
        onDelete: 'cascade',
    }),
}, (table) => ({
    rolPermisoUnico: (0, pg_core_1.unique)().on(table.rolId, table.permisoId),
}));
//# sourceMappingURL=roles-permisos.js.map