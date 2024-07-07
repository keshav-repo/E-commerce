import express, { Express } from "express";
import routes from "./routes";
import db from "./db";
import { errorHandler } from "./middleware/errorHandler";
import { passport } from './middleware';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';

db.connect();

const app: Express = express();
app.use(cors());

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

export default app;
