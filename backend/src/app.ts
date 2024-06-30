import express, { Express } from "express";
import { connectDB } from "./db/postgres";

connectDB();
const app: Express = express();

app.use(express.json());

export default app;
