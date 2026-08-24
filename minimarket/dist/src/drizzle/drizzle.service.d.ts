import { OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';
import 'dotenv/config';
export declare class DrizzleService implements OnModuleDestroy {
    private readonly pool;
    private readonly db;
    constructor();
    getDb(): import("drizzle-orm/node-postgres").NodePgDatabase<Record<string, unknown>> & {
        $client: Pool;
    };
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
