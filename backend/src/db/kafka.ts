import { Kafka, Producer } from 'kafkajs';
import L from '../helper/logger';
import { BROKERS } from '../config';

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: BROKERS
});

const producer: Producer = kafka.producer();

const connectKafka = async () => {
    await producer.connect();
    L.info('Kafka connected');
}

export {
    producer, connectKafka
};
