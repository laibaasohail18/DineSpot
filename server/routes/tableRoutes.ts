import { Router } from "express";
import { getRestaurantTables, addTable } from "../controllers/tableController.js";
import { protect, ownerOnly } from "../middlewares/auth.js";

const tableRouter = Router();

tableRouter.get("/restaurant/:restaurantId", getRestaurantTables);
tableRouter.post("/", protect, ownerOnly, addTable);

export default tableRouter;