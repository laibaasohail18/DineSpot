import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb://localhost:27017/dinespot";
    
    await mongoose.connect(mongoURI as string);
    console.log("✅ MongoDB Atlas / Database Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
