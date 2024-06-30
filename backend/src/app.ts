import express, { Express } from "express";
import { connectDB } from "./db/postgres";
import routes from "./routes";

connectDB();
const app: Express = express();
routes(app);

app.use(express.json());

export default app;
