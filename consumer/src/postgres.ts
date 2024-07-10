import { Pool, PoolClient, QueryResult, QueryResultRow } from "pg";

const POSTGRES_DB_HOST = 'localhost',
    POSTGRES_DB_PORT = 5432,
    POSTGRES_DB_USER = 'postgres',
    POSTGRES_DB_PASSWORD = 'mysecretpassword',
    POSTGRES_DB_NAME = 'ecommerce';

class Postgres {
    private pool: Pool;
    private poolClient!: PoolClient;
    constructor() {
        this.pool = new Pool({
            host: POSTGRES_DB_HOST,
            port: POSTGRES_DB_PORT,
            user: POSTGRES_DB_USER,
            password: POSTGRES_DB_PASSWORD,
            database: POSTGRES_DB_NAME,
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
}

export default Postgres;
