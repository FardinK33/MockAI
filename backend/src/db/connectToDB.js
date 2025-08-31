import mongoose from "mongoose";
import { config } from "../config/env-config";

export default connectToDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};
