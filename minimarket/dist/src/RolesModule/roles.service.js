"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_service_1 = require("../drizzle/drizzle.service");
const roles_1 = require("../drizzle/schema/roles");
let RolesService = class RolesService {
    drizzleService;
    constructor(drizzleService) {
        this.drizzleService = drizzleService;
    }
    get db() {
        return this.drizzleService.getDb();
    }
    async listar() {
        return this.db
            .select()
            .from(roles_1.roles);
    }
    async obtener(id) {
        const resultado = await this.db
            .select()
            .from(roles_1.roles)
            .where((0, drizzle_orm_1.eq)(roles_1.roles.id, id))
            .limit(1);
        if (!resultado[0]) {
            throw new common_1.NotFoundException('Rol no encontrado');
        }
        return resultado[0];
    }
    async crear(nombre, nivel) {
        try {
            const resultado = await this.db
                .insert(roles_1.roles)
                .values({
                nombre,
                nivel,
            })
                .returning();
            return resultado[0];
        }
        catch {
            throw new common_1.ConflictException('El rol ya existe');
        }
    }
    async actualizar(id, nombre, nivel) {
        await this.obtener(id);
        const resultado = await this.db
            .update(roles_1.roles)
            .set({
            ...(nombre !== undefined
                ? { nombre }
                : {}),
            ...(nivel !== undefined
                ? { nivel }
                : {}),
        })
            .where((0, drizzle_orm_1.eq)(roles_1.roles.id, id))
            .returning();
        return resultado[0];
    }
    async eliminar(id) {
        await this.obtener(id);
        const resultado = await this.db
            .delete(roles_1.roles)
            .where((0, drizzle_orm_1.eq)(roles_1.roles.id, id))
            .returning();
        return {
            mensaje: 'Rol eliminado correctamente',
            rol: resultado[0],
        };
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drizzle_service_1.DrizzleService])
], RolesService);
//# sourceMappingURL=roles.service.js.map