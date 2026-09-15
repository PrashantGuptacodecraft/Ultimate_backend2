import express from "express";
const app = express();
const PORT = 8000;
import mongoose from "mongoose";
const mongoUrl="mongodb+srv://PrashantGupta:prashant@cluster0.ur5cz0b.mongodb.net/VirtualCode";

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});