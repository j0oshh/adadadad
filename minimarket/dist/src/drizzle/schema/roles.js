"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roles = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.roles = (0, pg_core_1.pgTable)('roles', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    nombre: (0, pg_core_1.varchar)('nombre', { length: 50 })
        .notNull()
        .unique(),
    nivel: (0, pg_core_1.integer)('nivel')
        .notNull(),
});
//# sourceMappingURL=roles.js.map