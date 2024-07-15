import swaggerJsdoc, { Options } from 'swagger-jsdoc';
import swaggerUi from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swagger Express API',
            version: '1.0.0',
            description: 'E-commerce API documentation',
        },
    },
    apis: ['./src/routes/*.ts'],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
