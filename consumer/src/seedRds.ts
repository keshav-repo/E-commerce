import { QueryResult, QueryResultRow } from "pg";
import Postgres from "./postgres";
import { Product } from "./model/product";


async function main() {
    const postgres = new Postgres();
    await postgres.connect();

    const query = 'CREATE DATABASE ecommerce'

    try {
        const rows: QueryResult<QueryResultRow> = await postgres.execute(query, []);
        if (rows) {
            console.log('ecommerce database created');
            await postgres.disconnect();
        }
    } catch (err) {
        console.log('error creating ecommerce db', err)
        // process.exit(1);
    }

    const dbName = process.env.POSTGRES_DB_ECOMM;

    if (!dbName) {
        console.error('new database name is not set');
        process.exit(1)
    }

    const postgresEcommerce = new Postgres(dbName);
    await postgresEcommerce.connect();

    const SCHEMA_QUERY_FILE = process.env.SCHEMA_QUERY_FILE;
    const INSERT_QUERY_FILE = process.env.INSERT_QUERY_FILE;

    if (!SCHEMA_QUERY_FILE || !INSERT_QUERY_FILE) {
        console.error('sql file path is not set')
        process.exit(1)
    }

    try {
        await postgresEcommerce.executeQueryFromFile(SCHEMA_QUERY_FILE);
        console.log('successfully created schema');
    } catch (err) {
        console.error('error creating schema');
        console.error(err);
        //  process.exit(1);
    }

    try {
        await postgresEcommerce.executeQueryFromFile(INSERT_QUERY_FILE);
        console.log('successfully inserted data');
    } catch (err) {
        console.error('error inserting data');
        console.error(err);
        process.exit(1);
    }

    await postgresEcommerce.disconnect();
    process.exit(1);
}

main();
