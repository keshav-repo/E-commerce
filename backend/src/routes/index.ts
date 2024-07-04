import { Express } from "express";
import productRouter from "./productRoutes";
import searchRouter from "./searchRoute";

export default (app: Express): void => {
  app.use("/api/product", productRouter);
  app.use("/api/search", searchRouter);
};
