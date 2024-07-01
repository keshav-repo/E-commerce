import { db } from "./db";
import Postgres from "./postgres";

const db: db = new Postgres();
export default db;
