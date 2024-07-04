import { Client } from '@elastic/elasticsearch';
import { ES_HOST, ES_PASSWORD, ES_USERNAME } from '../config';

const client: Client = new Client({
    node: ES_HOST,
    auth: {
        username: ES_USERNAME,
        password: ES_PASSWORD
    }
});

export { client };