import { prisma } from "../src/db/prisma";
import { client as es } from "../src/db/es";
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';
import L from "../src/helper/logger";
import { product } from "@prisma/client";
import { Product } from "../src/model/product";

async function main() {
    try {
        await createProductIndex();
    } catch (err) {
        console.error(`error creating index on es ${err}`);
        process.exit(1);
    }
    type AdditionalInfo = {
        specifications?: {
            [key: string]: string;
        };
    };

    try {
        const products: product[] = await prisma.product.findMany();
        for (let product of products) {
            const images = product.images as unknown as string[]
            const p: Product = {
                productId: product.productid,
                name: product.name,
                price: product.price.toNumber(),
                category: product.category,
                company: product.company,
                gender: product.gender!,
                images: images,
                additionalInfo: product.additional_info! as AdditionalInfo,
                description: ''
            };
            await insertDocument('product', product.productid.toString(), product);
        }
    } catch (err) {
        L.error(`error seeding elastic search ${err}`);
        process.exit(0);
    }
}

main();

async function insertDocument<T>(index: string, id: string, document: T) {
    try {
        const response: WriteResponseBase = await es.index({
            index,
            id: id,
            body: document,
        });
        console.log('Document inserted:', response.result);
    } catch (error) {
        console.error('Error inserting document:', error);
    }
}

async function createProductIndex() {
    try {
        const response = await es.indices.create({
            index: 'product',
            body: {
                mappings: {
                    properties: {
                        productId: { type: 'integer' },
                        name: { type: 'text' },
                        price: { type: 'float' },
                        category: { type: 'keyword' },
                        company: { type: 'keyword' },
                        gender: { type: 'keyword' },
                        images: { type: 'keyword' },
                        additionalInfo: {
                            properties: {
                                specifications: {
                                    type: 'nested',
                                    properties: {
                                        key: { type: 'keyword' },
                                        value: { type: 'keyword' }
                                    }
                                }
                            }
                        },
                        description: { type: 'keyword' }
                    }
                }
            }
        });

        console.log('Index created:', response);
    } catch (error: any) {
        if (error.meta && error.meta.body && error.meta.body.error && error.meta.body.error.type === 'resource_already_exists_exception') {
            console.log('Index already exists');
        } else {
            console.error('Error creating index:', error);
        }
    }
};

