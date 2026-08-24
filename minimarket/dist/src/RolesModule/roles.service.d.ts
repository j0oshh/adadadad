import { DrizzleService } from '../drizzle/drizzle.service';
export declare class RolesService {
    private readonly drizzleService;
    constructor(drizzleService: DrizzleService);
    private get db();
    listar(): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }[]>;
    obtener(id: number): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    crear(nombre: string, nivel: number): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    actualizar(id: number, nombre?: string, nivel?: number): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    eliminar(id: number): Promise<{
        mensaje: string;
        rol: {
            id: number;
            nombre: string;
            nivel: number;
        };
    }>;
}
