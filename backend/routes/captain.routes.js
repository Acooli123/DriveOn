import captainController from "../controllers/captain.controller.js";
import express from "express";
import { body, validationResult } from "express-validator";
import { authCaptain } from '../middlewares/auth.middileware.js';
import BlacklistToken from "../models/blacklistToken.model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Captain route working" });
});

router.post(
  "/register",
  body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  body("fullName.lastName").isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color is required"),
  body("vehicle.licensePlate").isLength({ min: 3 }).withMessage("License plate must be at least 3 characters long"),
  body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car A/C", "bike", "car non-A/C", "shuttle"])
    .withMessage("Invalid vehicle type"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  captainController.registerCaptain
);


router.post("/login",
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  captainController.loginCaptain
)

router.get("/profile", authCaptain, captainController.getProfile);

router.get("/logout", authCaptain, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(400).json({ message: "No token" });

    await BlacklistToken.create({ token });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: err.message });
  }
});



export default router;