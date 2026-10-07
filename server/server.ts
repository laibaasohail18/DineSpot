/* eslint-disable @typescript-eslint/no-unused-vars */
import "dotenv/config";
import dns from "node:dns";

// DNS Resolution Override Fix for MongoDB Atlas connectivity
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import restaurantRouter from "./routes/restaurantRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import tableRouter from "./routes/tableRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

// 1. Core Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Health Check & Test Routes
app.get("/", (_req: Request, res: Response) => {
  res.send("DineSpot Server is Live & Healthy!");
});

app.get("/api/test", (_req: Request, res: Response) => {
  res.status(200).json({ message: "DineSpot API Test route working properly!" });
});

// 3. API Route Bindings
app.use("/api/auth", authRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/admin", adminRouter);
app.use("/api/tables", tableRouter);

// 4. Global Unhandled Error Middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

// 5. Unmatched 404 Route Handler
app.use((req: Request, res: Response) => {
  console.log(`[404 Not Found]: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: `Route ${req.originalUrl} Not Found` });
});

// 6. Server Initialization
const startApp = async () => {
  try {
    await connectDB();
    if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
      app.listen(port, () => {
        console.log(`🚀 DineSpot Server running on port ${port}`);
      });
    }
  } catch (error) {
    console.error("❌ Database connection failed. Server not started.", error);
  }
};

startApp();
export default app;