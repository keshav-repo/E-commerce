import { Client } from '@elastic/elasticsearch';
import { ES_HOST, ES_PASSWORD, ES_USERNAME } from '../config';
import L from '../helper/logger';

const client: Client = new Client({
    node: ES_HOST,
    auth: {
        username: ES_USERNAME,
        password: ES_PASSWORD
    }
});


const ping = async function () {
    try {
        await client.ping();
        console.log('Elasticsearch cluster is up!');
    } catch (error) {
        L.error("error connecting to es");
        process.exit(1);
    }
}

export { client, ping };
