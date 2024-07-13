import { db } from "./db";
import Postgres from "./postgres";
import { producer, connectKafka } from "./kafka";
import { prisma, pingDb } from "./prisma";

const db: db = new Postgres();
export { db, producer, connectKafka, prisma, pingDb };
