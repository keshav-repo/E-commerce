import { Router } from "express";
import { homePageController } from "../controller";

const homePageRouter: Router = Router();

homePageRouter.get("", homePageController.getCategoryInfo);

export default homePageRouter;
