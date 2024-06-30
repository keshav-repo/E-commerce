import express, { Express } from "express";
import { connectDB } from "./db/postgres";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

connectDB();
const app: Express = express();

app.use(express.json());

export default app;
