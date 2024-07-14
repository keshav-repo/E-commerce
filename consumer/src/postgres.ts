import dotenv from "dotenv";
dotenv.config();
import fs from "fs/promises";

import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

const POSTGRES_DB_HOST = process.env.POSTGRES_DB_HOST;
const POSTGRES_DB_PORT = Number(process.env.POSTGRES_DB_PORT);
const POSTGRES_DB_USER = process.env.POSTGRES_DB_USER;
const POSTGRES_DB_PASSWORD = process.env.POSTGRES_DB_PASSWORD;
const POSTGRES_DB_NAME = process.env.POSTGRES_DB_NAME;

class Postgres {
    private pool: Pool;
    private poolClient!: PoolClient;
    constructor(database: string = "") {
        this.pool = new Pool({
            host: POSTGRES_DB_HOST,
            port: POSTGRES_DB_PORT,
            user: POSTGRES_DB_USER,
            password: POSTGRES_DB_PASSWORD,
            database: database || POSTGRES_DB_NAME,
        });
    }
    public connect = async () => {
        try {
            this.poolClient = await this.pool.connect();
            console.info("client connected");
        } catch (err) {
            console.error("error connecting to db");
            process.exit(1);
        }
    };

    public execute = async <R extends QueryResultRow>(query: string, values: any[]): Promise<QueryResult<R>> => {
        try {
            const result: QueryResult<R> = await this.poolClient.query(query, values);
            return result;
        } catch (err) {
            console.error("error executing query", err);
            throw err;
        }
    }

    async disconnect() {
        if (this.poolClient) {
            await this.poolClient.release();
        }
        await this.pool.end();
    }

    async executeQueryFromFile(filePath: string): Promise<QueryResult<QueryResultRow>> {
        const query = await fs.readFile(filePath, "utf-8");
        return this.execute(query, []);
    }
}

export default Postgres;
