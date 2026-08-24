"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const drizzle_orm_1 = require("drizzle-orm");
const drizzle_service_1 = require("../drizzle/drizzle.service");
const users_1 = require("../drizzle/schema/users");
let UserService = class UserService {
    drizzleService;
    constructor(drizzleService) {
        this.drizzleService = drizzleService;
    }
    async listar() {
        const db = this.drizzleService.getDb();
        return db
            .select({
            id: users_1.users.id,
            nombre: users_1.users.nombre,
            email: users_1.users.email,
            rolId: users_1.users.rolId,
            activo: users_1.users.activo,
            eliminado: users_1.users.eliminado,
        })
            .from(users_1.users);
    }
    async crear(data) {
        const db = this.drizzleService.getDb();
        const usuarioExistente = await db
            .select()
            .from(users_1.users)
            .where((0, drizzle_orm_1.eq)(users_1.users.email, data.email));
        if (usuarioExistente.length > 0) {
            throw new common_1.ConflictException('El correo ya está registrado');
        }
        const passwordHash = await bcrypt.hash(data.password, 10);
        const resultado = await db
            .insert(users_1.users)
            .values({
            nombre: data.nombre,
            email: data.email,
            password: passwordHash,
            rolId: data.rolId,
            activo: true,
            eliminado: false,
        })
            .returning({
            id: users_1.users.id,
            nombre: users_1.users.nombre,
            email: users_1.users.email,
            rolId: users_1.users.rolId,
            activo: users_1.users.activo,
            eliminado: users_1.users.eliminado,
        });
        return resultado[0];
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [drizzle_service_1.DrizzleService])
], UserService);
//# sourceMappingURL=user.service.js.map