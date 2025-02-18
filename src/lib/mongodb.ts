import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI || "mongodb://localhost:27017/smart_city_db";

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
};

export default connectDB;
