import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

console.log("App file loaded");   // 👈 add this

const app = express();
import connectDB from "./db/db.js";
import userRoutes from './routes/user.routes.js';
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("GET / hit");       // 👈 add this
  res.send("Hello World!");
});

app.use('/users', userRoutes)

export default app;