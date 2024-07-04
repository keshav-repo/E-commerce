import { Router } from "express";
import { searchController } from "../controller";

const searchRouter: Router = Router();

searchRouter.get("", searchController.searchProduct);

export default searchRouter;
