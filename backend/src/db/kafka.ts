import { Kafka, Producer } from 'kafkajs';
import L from '../helper/logger';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer: Producer = kafka.producer();

const connectKafka = async () => {
    await producer.connect();
    L.info('Kafka connected');
}

export {
    producer, connectKafka
};
