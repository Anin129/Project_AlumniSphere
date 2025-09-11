import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined");
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    mongoose.connection.once("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error", error);
      process.exit(1);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;