import { Router } from "express";
import upload from "../config/multer.js";
import { ownerOnly, protect } from "../middlewares/auth.js";
import {
  createOwnerRestaurant,
  getOwnerBookings,
  getOwnerRestaurant,
  updateBookingStatus,
  updateOwnerRestaurant,
} from "../controllers/ownerController.js";

const ownerRouter = Router();

// Express protection middleware: User must be logged in
ownerRouter.use(protect);

// 1. Routes accessible to users during or after becoming an owner
ownerRouter.get("/restaurant", getOwnerRestaurant);
ownerRouter.post("/restaurant", upload.single("image"), createOwnerRestaurant);

// 2. Strict Owner-Only operations (Require 'owner' role in token/DB)
ownerRouter.put("/restaurant", ownerOnly, upload.single("image"), updateOwnerRestaurant);
ownerRouter.get("/bookings", ownerOnly, getOwnerBookings);
ownerRouter.put("/bookings/:id/status", ownerOnly, updateBookingStatus);

export default ownerRouter;