"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permisos = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.permisos = (0, pg_core_1.pgTable)('permisos', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nombre: (0, pg_core_1.varchar)('nombre', { length: 100 })
        .notNull()
        .unique(),
    descripcion: (0, pg_core_1.text)('descripcion'),
});
//# sourceMappingURL=permisos.js.map