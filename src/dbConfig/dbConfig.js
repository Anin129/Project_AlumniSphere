import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    if (!MONGO_URI) throw new Error("MONGO_URI is not defined");
    await mongoose.connect(MONGO_URI);
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