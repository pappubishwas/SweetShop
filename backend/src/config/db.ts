import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGO_URI || "mongodb://localhost:27017/sweetshop";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
