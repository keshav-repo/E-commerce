import { QueryResult, QueryResultRow } from "pg";
import Postgres from "./postgres";
import { Product } from "./model/product";
import { insertDocument, createProductIndex } from "./es";

async function main() {

    const dbName = process.env.POSTGRES_DB_ECOMM;

    if (!dbName) {
        console.error('new database name is not set');
        process.exit(1)
    }

    const postgres = new Postgres(dbName);
    await postgres.connect();

    const rows: QueryResult<QueryResultRow> = await postgres.execute('select * from product', []);

    try {
        await createProductIndex();
    } catch (err) {
        console.error(`error creating index on es ${err}`);
        process.exit(1);
    }

    for (let row of rows.rows) {
        const product: Product = {
            productId: row.product_id,
            name: row.name,
            price: parseInt(row.price),
            category: row.category,
            company: row.company,
            gender: row.gender,
            images: row.images,
            additionalInfo: row.additional_info,
            description: ''
        };
        try {
            await insertDocument('product', product.productId!, product);
        } catch (err) {
            console.error(`error inseting in index ${err}`);
            process.exit(1);
        }
    }

    await postgres.disconnect();

    process.exit(1);
}

main();
