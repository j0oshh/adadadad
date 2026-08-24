import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            rolId: number;
        };
    }>;
}
