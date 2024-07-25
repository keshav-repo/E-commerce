import { db } from "./db";
import Postgres from "./postgres";
import { producer, connectKafka } from "./kafka";
import { prisma, pingDb } from "./prisma";
import { client as es, ping } from "./es";

const db: db = new Postgres();
export { db, producer, connectKafka, prisma, pingDb, es, ping };
