import { Client } from "pg";
import L from "../helper/logger";

import {
  POSTGRES_DB_HOST,
  POSTGRES_DB_NAME,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USER,
} from "../config";

const client: Client = new Client({
  host: POSTGRES_DB_HOST,
  port: POSTGRES_DB_PORT,
  user: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_NAME,
});

const connectDB = async function () {
  try {
    await client.connect();
    L.info("client connected");
  } catch (err) {
    L.error("error connecting to db");
    process.exit(1);
  }
};

export { client, connectDB };
