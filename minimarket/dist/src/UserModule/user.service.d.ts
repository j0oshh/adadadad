import { DrizzleService } from '../drizzle/drizzle.service';
export declare class UserService {
    private readonly drizzleService;
    constructor(drizzleService: DrizzleService);
    listar(): Promise<{
        id: number;
        nombre: string;
        email: string;
        rolId: number;
        activo: boolean;
        eliminado: boolean;
    }[]>;
    crear(data: {
        nombre: string;
        email: string;
        password: string;
        rolId: number;
    }): Promise<{
        id: number;
        nombre: string;
        email: string;
        rolId: number;
        activo: boolean;
        eliminado: boolean;
    }>;
}
