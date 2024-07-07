import { db } from "./db";
import Postgres from "./postgres";
import { producer, connectKafka } from "./kafka";

const db: db = new Postgres();
export { db, producer, connectKafka };
