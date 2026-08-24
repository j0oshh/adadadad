import { JwtService } from '@nestjs/jwt';
import { DrizzleService } from '../drizzle/drizzle.service';
export declare class AuthService {
    private readonly drizzleService;
    private readonly jwtService;
    constructor(drizzleService: DrizzleService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
        usuario: {
            id: number;
            nombre: string;
            email: string;
            rolId: number;
        };
    }>;
}
