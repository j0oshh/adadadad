import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    listar(): Promise<{
        id: number;
        nombre: string;
        email: string;
        rolId: number;
        activo: boolean;
        eliminado: boolean;
    }[]>;
    crear(body: {
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
