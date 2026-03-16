import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, Poolconfig } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {

    private pool: Pool;

    // Postgres configuration
    private readonly config: Poolconfig = {
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       host: process.env.DB_HOST,
       database: process.env.DB_NAME,
       port: Number(process.env.DB_PORT),
       pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
       }
    };

    // Connectiong to DB when app laucnh
    async onModuleInit(): Promise<void> {
        await this.connectToDatabase();
    }

    // Closing connection to DB when app stop
    async onModuleDestroy(): Promise<void> {
        if (this.pool) {
            await this.pool.close();
        }
    }

    // Function called to connect to DB
    private async connectToDatabase(): Promise <void> {
        try{
            if (!this.pool) {
                this.pool = await new Pool(this.config).connect();
                console.log('DB connected.')
            }
        } catch (err) {
            throw new Error('Connection to DB failed.')
        }
    }

    // Funtion used to run queries
    async runQuery(query: string) {
        try{
            if(!this.pool) {
                await this.connectToDatabase();
            }

            const result = await this.pool.query(query);

            return result;

        } catch (err) {
            throw new Error ('Failed to run query.')
        }
    }
}
