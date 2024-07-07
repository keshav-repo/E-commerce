import dotenv from "dotenv";
import { CONSTANTS } from './constants';

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

export const USER_AUTH_KEYS = process.env.USER_AUTH_KEYS;

export const GOOGLE_AUTH_CLIENTID = process.env.GOOGLE_AUTH_CLIENTID || '';
export const GOOGLE_AUTH_SECRET = process.env.GOOGLE_AUTH_SECRET || '';

export const TOKEN_AGE_IN_MS = process.env.TOKEN_AGE_IN_MS ? parseInt(process.env.TOKEN_AGE_IN_MS) : 3600000; // 1 hour default
export const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY || '7d';
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY || '1h'

export { CONSTANTS };
