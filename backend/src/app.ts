import express, { Express } from "express";
import routes from "./routes";
import { db, connectKafka } from "./db";
import { errorHandler } from "./middleware/errorHandler";
import { passport } from './middleware';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { ping } from "./db/es";
import { pingDb } from "./db";
import { specs, swaggerUi } from "./middleware";

import YAML from 'yamljs';
import path from 'path';

db.connect();
connectKafka();
// ping elastic search to check connection
ping();

// ping postgres using prisma 
pingDb();

const app: Express = express();
app.use(cors());

// this is seperated fro other router as we don't need to parse raw body in this case
import { paymentController } from "./controller";
app.post('/api/payment/webhook', express.raw({ type: 'application/json' }), paymentController.stripeWebhook)


app.use(cookieParser());
app.use(express.json());

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use(errorHandler);

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/openapi.yaml'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app;
