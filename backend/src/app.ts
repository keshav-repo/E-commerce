import express, { Express } from "express";
import routes from "./routes";
import db from "./db";

db.connect();

const app: Express = express();
app.use(express.json());

routes(app);

export default app;
