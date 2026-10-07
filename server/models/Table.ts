import mongoose, { Schema, Document } from "mongoose";

export interface ITable extends Document {
  restaurant: mongoose.Types.ObjectId;
  tableNumber: string;
  capacity: number;
  location: "indoor" | "outdoor" | "rooftop" | "vip";
  status: "available" | "reserved" | "occupied";
}

const TableSchema = new Schema<ITable>(
  {
    restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
    tableNumber: { type: String, required: true },
    capacity: { type: Number, required: true },
    location: {
      type: String,
      enum: ["indoor", "outdoor", "rooftop", "vip"],
      default: "indoor",
    },
    status: {
      type: String,
      enum: ["available", "reserved", "occupied"],
      default: "available",
    },
  },
  { timestamps: true }
);

export const Table = mongoose.model<ITable>("Table", TableSchema);