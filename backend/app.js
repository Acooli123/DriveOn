import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mapRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';
dotenv.config();

console.log("App file loaded");   // 👈 add this

const app = express();
import connectDB from "./db/db.js";
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
connectDB();

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("GET / hit");       // 👈 add this
  res.send("Hello World!");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

export default app;