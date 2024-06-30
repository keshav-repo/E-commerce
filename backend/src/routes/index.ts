import { Express } from "express";
import productRouter from "./productRoutes";

export default (app: Express): void => {
  app.use("/api/product", productRouter);
};
