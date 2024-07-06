import { Express } from "express";
import productRouter from "./productRoutes";
import searchRouter from "./searchRoute";
import userRouter from "./userRouter";
import googleAuthRouter from "./googleAuthRoutes";

export default (app: Express): void => {
  app.use("/api/product", productRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/user", userRouter);
  app.use("", googleAuthRouter);
};
