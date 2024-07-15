import JWTMiddleware from "./JWTMiddleware";
import passport from "./googleAuth";
import { specs, swaggerUi } from "./swagger";

const jWTMiddleware = new JWTMiddleware();

export { jWTMiddleware, passport, specs, swaggerUi };
