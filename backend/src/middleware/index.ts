import JWTMiddleware from "./JWTMiddleware";
import passport from "./googleAuth";
import { specs, swaggerUi } from "./swagger";
import { stripe, createWebhookEndpoint } from "./Stripe";

const jWTMiddleware = new JWTMiddleware();

export { jWTMiddleware, passport, specs, swaggerUi, stripe, createWebhookEndpoint };
