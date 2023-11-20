import { Router } from "express";

import { usersRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { specificationsRoutes } from "./specifications.routes";
import { rentalsRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";

export const router = Router();

router.use(authenticateRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/password", passwordRoutes);
