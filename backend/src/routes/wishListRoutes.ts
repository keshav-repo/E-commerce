import { Router } from "express";
import { wishlistController } from "../controller";
import { jWTMiddleware } from "../middleware";

const wishlistRoutes: Router = Router();

wishlistRoutes.post("", jWTMiddleware.authenticateJWT, wishlistController.addToWishList);
wishlistRoutes.delete("", jWTMiddleware.authenticateJWT, wishlistController.removeFromWishList);

export default wishlistRoutes;
