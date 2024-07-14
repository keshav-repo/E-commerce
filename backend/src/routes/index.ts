import { Express } from "express";
import productRouter from "./productRoutes";
import searchRouter from "./searchRoute";
import userRouter from "./userRouter";
import googleAuthRouter from "./googleAuthRoutes";
import homePageRouter from "./homePageRoutes";
import cartRouter from "./cartRoutes";
import wishlistRoutes from "./wishListRoutes";

export default (app: Express): void => {
  app.use("/api/product", productRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/user", userRouter);
  app.use("/api/view/home", homePageRouter);
  app.use("", googleAuthRouter);
  app.use("/api/cart", cartRouter);
  app.use("/api/wishlist", wishlistRoutes);
};
