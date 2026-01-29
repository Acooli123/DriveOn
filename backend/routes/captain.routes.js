import captainController from "../controllers/captain.controller.js";
import express from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

const validateCaptain = [
  body("fullName.firstName").isLength({ min: 3 }).withMessage("First name must be at least 3 characters long"),
  body("fullName.lastName").isLength({ min: 3 }).withMessage("Last name must be at least 3 characters long"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  body("vehicle.color").isLength({ min: 3 }).withMessage("Vehicle color is required"),
  body("vehicle.licensePlate").isLength({ min: 3 }).withMessage("License plate must be at least 3 characters long"),
  body("vehicle.capacity").isInt({ min: 1 }).withMessage("Capacity must be at least 1"),
  body("vehicle.vehicleType")
    .isIn(["car A/C", "bike", "car non-A/C", "shuttle"])
    .withMessage("Invalid vehicle type")
];

router.post(
  "/register",
  validateCaptain,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  captainController.registerCaptain
);

export default router;
