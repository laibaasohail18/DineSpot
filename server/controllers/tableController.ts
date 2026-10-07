/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Table } from "../models/Table.js";
import { AuthRequest } from "../middlewares/auth.js";
import { Restaurant } from "../models/Restaurant.js";

// Get tables for a restaurant
// GET /api/tables/restaurant/:restaurantId
export const getRestaurantTables = async (req: Request, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const tables = await Table.find({ restaurant: restaurantId });
    res.json(tables);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Owner: Add a new table
// POST /api/tables
export const addTable = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { tableNumber, capacity, location } = req.body;
    const restaurant = await Restaurant.findOne({ owner: req.user?._id });

    if (!restaurant) {
      res.status(404).json({ message: "Restaurant profile not found" });
      return;
    }

    const newTable = await Table.create({
      restaurant: restaurant._id,
      tableNumber,
      capacity: Number(capacity),
      location,
    });

    res.status(201).json(newTable);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};