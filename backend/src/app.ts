import express, { Express } from "express";
import { connectDB } from "./db/postgres";
import routes from "./routes";

connectDB();
const app: Express = express();
app.use(express.json());


routes(app);

export default app;
