import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const POSTGRES_DB_HOST = process.env.DB_HOST;
export const POSTGRES_DB_PORT = Number(process.env.DB_PORT);
export const POSTGRES_DB_USER = process.env.DB_USER;
export const POSTGRES_DB_PASSWORD = process.env.DB_PASSWORD;
export const POSTGRES_DB_NAME = process.env.DB_NAME;

export const ES_HOST = process.env.ES_HOST || '';
export const ES_USERNAME = process.env.ES_USERNAME || '';
export const ES_PASSWORD = process.env.ES_PASSWORD || '';
