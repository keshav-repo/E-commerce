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

export { es, insertDocument };