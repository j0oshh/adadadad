import { RolesService } from './roles.service';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    listar(): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }[]>;
    obtener(id: string): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    crear(body: {
        nombre: string;
        nivel: number;
    }): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    actualizar(id: string, body: {
        nombre?: string;
        nivel?: number;
    }): Promise<{
        id: number;
        nombre: string;
        nivel: number;
    }>;
    eliminar(id: string): Promise<{
        mensaje: string;
        rol: {
            id: number;
            nombre: string;
            nivel: number;
        };
    }>;
}
