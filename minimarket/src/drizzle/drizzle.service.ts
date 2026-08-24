import { Injectable, OnModuleDestroy, } from '@nestjs/common';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import 'dotenv/config';

@Injectable()
export class DrizzleService
  implements OnModuleDestroy
{
  private readonly pool: Pool;

  private readonly db: ReturnType<
    typeof drizzle
  >;

  constructor() {
    this.pool = new Pool({
      connectionString:
        process.env.DATABASE_URL,
    });

    this.db = drizzle(this.pool);
  }

  getDb() {
    return this.db;
  }

  async onModuleInit() {
    await this.pool.query('SELECT 1');
  }

  async onModuleDestroy() {
    await this.pool.end();
  }
}