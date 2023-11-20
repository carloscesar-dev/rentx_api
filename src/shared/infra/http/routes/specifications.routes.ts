import { Router } from "express";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateSpecificationsController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationsController";
import { ListSpecificationsController } from "@modules/cars/useCases/ListSpecification/ListSpecificationsController";

export const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);
