import express, { Express } from "express";
import routes from "./routes";
import db from "./db";
import { errorHandler } from "./middleware/errorHandler";

db.connect();

const app: Express = express();
app.use(express.json());

routes(app);

app.use(errorHandler);

export default app;
