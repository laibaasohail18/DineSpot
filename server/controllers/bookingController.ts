/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.js";
import { Restaurant } from "../models/Restaurant.js";
import { Booking } from "../models/Booking.js";

// Create a new booking
// POST /api/bookings
// @access Private
export const createBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId, table, date, time, guests, occasion, specialRequests } = req.body;

    if (!restaurantId || !date || !time || !guests) {
      res.status(400).json({ message: "Please provide all required reservation details." });
      return;
    }

    // Check if the restaurant exists
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      res.status(404).json({ message: "Restaurant not found." });
      return;
    }

    // Verify restaurant is approved
    if (restaurant.status !== "approved") {
      res.status(400).json({ message: "Reservations are not open for this restaurant yet." });
      return;
    }

    const bookingDate = new Date(date);

    // 1. SPECIFIC TABLE CHECK: Direct concurrency lock for selected table
    if (table) {
      const existingTableBooking = await Booking.findOne({
        table,
        date: bookingDate,
        time,
        status: "confirmed",
      });

      if (existingTableBooking) {
        res.status(400).json({
          message: "Yeh table is time slot par pehle se book ho chuka hai! Kripya doosra slot ya table chunein.",
        });
        return;
      }
    }

    // 2. CAPACITY OVERALL CHECK: Verify overall capacity for the slot
    const requestedGuests = Number(guests);

    const existingBookings = await Booking.find({
      restaurant: restaurantId,
      date: bookingDate,
      time,
      status: "confirmed",
    });

    const bookedSeats = existingBookings.reduce((sum, b) => sum + b.guests, 0);
    const totalSeats = restaurant.totalSeats || 20;
    const availableSeats = totalSeats - bookedSeats;

    if (requestedGuests > availableSeats) {
      res.status(400).json({
        message: `Unable to reserve. Only ${availableSeats} seats are available for this time slot.`,
      });
      return;
    }

    // 3. CREATE BOOKING
    const booking = await Booking.create({
      user: req.user?._id,
      restaurant: restaurantId,
      table: table || undefined,
      date: bookingDate,
      time,
      guests: requestedGuests,
      occasion,
      specialRequests,
      status: "confirmed",
    });

    // Populate restaurant & table info before returning
    const populatedBooking = await booking.populate([
      { path: "restaurant", select: "name location image address" },
      { path: "table", select: "tableNumber location capacity" },
    ]);

    res.status(201).json(populatedBooking);
  } catch (error: any) {
    // MongoDB Unique Compound Index collision catch (Race condition fallback)
    if (error.code === 11000) {
      res.status(400).json({
        message: "Double booking blocked! Is time slot par yeh table kisi aur ne abhi reserve kar liya hai.",
      });
      return;
    }
    console.error("Create Booking Error:", error);
    res.status(400).json({ message: error.message || "Server error while creating booking." });
  }
};

// Get logged in user bookings
// GET /api/bookings/my
// @access Private
export const getMyBookings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const bookings = await Booking.find({ user: req.user?._id })
      .populate("restaurant", "name location image address slug")
      .populate("table", "tableNumber capacity location")
      .sort({ date: -1, time: -1 });

    res.status(200).json(bookings);
  } catch (error: any) {
    console.error("Get My Bookings Error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Cancel a booking
// PUT /api/bookings/:id/cancel
// @access Private
export const cancelBooking = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      res.status(404).json({ message: "Booking not found." });
      return;
    }

    // Verify user owns the booking
    if (booking.user.toString() !== req.user?._id?.toString()) {
      res.status(401).json({ message: "You are not authorized to cancel this booking." });
      return;
    }

    booking.status = "cancelled";
    await booking.save();

    const populatedBooking = await booking.populate([
      { path: "restaurant", select: "name location image address" },
      { path: "table", select: "tableNumber capacity location" },
    ]);

    res.json(populatedBooking);
  } catch (error: any) {
    console.error("Cancel Booking Error:", error);
    res.status(400).json({ message: error.message });
  }
};