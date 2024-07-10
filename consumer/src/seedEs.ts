import { QueryResult, QueryResultRow } from "pg";
import Postgres from "./postgres";
import { Product } from "./model/product";
import { insertDocument } from "./es";

async function main() {
    const postgres = new Postgres();
    await postgres.connect();

    const rows: QueryResult<QueryResultRow> = await postgres.execute('select * from product', []);
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
        await insertDocument('product', product.productId!, product);
    }
}

main();
