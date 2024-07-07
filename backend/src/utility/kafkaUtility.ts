import { producer } from "../db";
import L from "../helper/logger";

const produceMessage = async <T>(data: T, key: string, topic: string) => {
    try {
        const message = {
            key: key,
            value: JSON.stringify(data)
        };
        await producer.send({
            topic: topic,
            messages: [message]
        });
        L.debug(`message produced`)
        L.debug(JSON.stringify(message));
    } catch (err) {
        L.error(`error producing message to topic ${topic} with data key ${key}`, err)
    }
}

export {
    produceMessage
}