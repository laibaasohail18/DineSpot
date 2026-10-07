import { Router } from "express";
import { adminOnly, protect } from "../middlewares/auth.js";
import {
  ApproveRestaurant,
  getAdminStats,
  getAllRestaurants,
} from "../controllers/adminController.js";

const adminRouter = Router();

// Middleware: Require valid JWT & Admin role for all admin routes
adminRouter.use(protect);
adminRouter.use(adminOnly);

adminRouter.get("/restaurants", getAllRestaurants);
adminRouter.put("/restaurants/:id/approve", ApproveRestaurant);
adminRouter.get("/stats", getAdminStats);

export default adminRouter;