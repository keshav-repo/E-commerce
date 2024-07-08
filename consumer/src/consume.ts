import { consumer } from './consumer'
import { insertDocument } from './es'
import { Product } from './model/product';

const topic = 'product';

async function main() {
    await consumer.connect();

    await consumer.subscribe({ topics: [topic] });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const value = message.value?.toString();
            // console.log(`Received message on topic ${topic} partition ${partition}: ${value}`);
            try {
                const product: Product = JSON.parse(value!);
                console.log(product);
                await insertDocument('product', product.productId!, product);
                console.log('document inserted in es');
            } catch (err) {
                console.error(`error parsing product ${err}`);
            }
        },
    });
}

main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
