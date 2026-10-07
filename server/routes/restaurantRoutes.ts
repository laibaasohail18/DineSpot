import { Router } from "express";
import {
  getFeaturedRestaurants,
  getRestaurantAvailability,
  getRestaurants,
  getRestaurantsBySlug,
} from "../controllers/restaurantController.js";

const restaurantRouter = Router();

// 1. Static / Specific Routes (Top-level routes pehle aane chahiye)
restaurantRouter.get("/", getRestaurants);
restaurantRouter.get("/featured", getFeaturedRestaurants);

// 2. Dynamic Parametric Routes (Slug aur ID routes neeche hone chahiye)
restaurantRouter.get("/:slug", getRestaurantsBySlug);
restaurantRouter.get("/:id/availability", getRestaurantAvailability);

export default restaurantRouter;