import { Client } from '@elastic/elasticsearch';
import { WriteResponseBase } from '@elastic/elasticsearch/lib/api/types';

const ES_HOST = 'http://localhost:9800',
    ES_USERNAME = 'elastic',
    ES_PASSWORD = 'password@123'

const es: Client = new Client({
    node: ES_HOST,
    auth: {
        username: ES_USERNAME,
        password: ES_PASSWORD
    }
});

const createProductIndex = async () => {
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

const insertDocument = async <T>(index: string, id: string, document: T) => {
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

export { es, insertDocument, createProductIndex };