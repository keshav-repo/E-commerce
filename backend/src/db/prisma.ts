import { PrismaClient } from '@prisma/client';
import L from '../helper/logger';

const prisma: PrismaClient = new PrismaClient();

const pingDb = async () => {
    try {
        await prisma.$connect();
        L.info('postres db is connected')
    } catch (error) {
        L.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

export {
    prisma, pingDb
};
