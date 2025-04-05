import mongoose from "mongoose";
import { mongodbURL } from "./conf.js";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(mongodbURL);
    if (db) console.log("Successufully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
