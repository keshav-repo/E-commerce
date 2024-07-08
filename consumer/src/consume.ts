import { consumer } from './consumer'

const topic = 'product';

async function main() {
    await consumer.connect();

    await consumer.subscribe({ topics: [topic] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value?.toString();
            console.log(`Received message on topic ${topic} partition ${partition}: ${value}`);
        },
    });
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
