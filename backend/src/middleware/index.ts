import JWTMiddleware from "./JWTMiddleware";
import passport from "./googleAuth";

const jWTMiddleware = new JWTMiddleware();

export { jWTMiddleware, passport };
