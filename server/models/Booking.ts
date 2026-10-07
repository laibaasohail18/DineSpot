import { Document, Types, model, Schema } from "mongoose";
import crypto from "crypto";

export interface IBooking extends Document {
  user: Types.ObjectId;
  restaurant: Types.ObjectId;
  table?: Types.ObjectId;
  date: Date;
  time: string;
  guests: number;
  occasion?: string;
  specialRequests?: string;
  status: "confirmed" | "cancelled" | "completed";
  bookingId: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    table: { type: Schema.Types.ObjectId, ref: "Table" },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true, min: 1 },
    occasion: { type: String, trim: true },
    specialRequests: { type: String, trim: true },
    status: { type: String, enum: ["confirmed", "cancelled", "completed"], default: "confirmed" },
    bookingId: { type: String, unique: true },
  },
  { timestamps: true }
);

// 🔒 DOUBLE BOOKING PREVENTION INDEX
// Same table, date, aur time slot par duplicate confirmed bookings ko DB level par block karta hai
BookingSchema.index(
  { table: 1, date: 1, time: 1, status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: "confirmed", table: { $exists: true } },
  }
);

// Auto-generate reference code on save
BookingSchema.pre("save", function () {
  if (!this.bookingId) {
    this.bookingId = `GR-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
  }
});

export const Booking = model<IBooking>("Booking", BookingSchema);
export default Booking;