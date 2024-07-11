import { Pool, PoolClient } from "pg";
import L from "../helper/logger";

import {
  POSTGRES_DB_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USER,
} from "../config";


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
      L.info("postgres client connected");
    } catch (err) {
      L.error("error connecting to db");
      process.exit(1);
    }
  };

  public execute = async (query: string, values: any[]) => {
    return this.poolClient.query(query, values);
  }
}

export default Postgres;
