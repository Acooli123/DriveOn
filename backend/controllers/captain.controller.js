import Captain from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from "express-validator";

const captainController = {
  registerCaptain: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { fullName, email, password, vehicle, age, experience } = req.body;

      const isCaptainExists = await Captain.findOne({ email });
      if (isCaptainExists) {
        return res.status(400).json({ error: "Captain already exists" });
      }

      // create & save using your service
      const captain = await createCaptain({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password,
        color : vehicle.color,
        licensePlate : vehicle.licensePlate,
        capacity : vehicle.capacity,
        vehicleType : vehicle.vehicleType,
        age,
        experience
      });

      // generate token from mongoose document
      const token = captain.generateAuthToken();

      res.status(201).json({
        message: "Captain created",
        token,
        captain
      });

    } catch (err) {
      console.error("Captain error:", err);
      res.status(400).json({ message: err.message });
    }
  },

  loginCaptain: async (req, res) => {
  try {
    const { email, password } = req.body;

    const captain = await Captain.findOne({ email });
    if (!captain) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = captain.generateAuthToken();

    res.status(200).json({
      message: "Login successful",
      token,
      captain
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
},

getProfile: async (req, res) => {
  try {
    console.log("DECODED TOKEN:", req.captain);

    const captain = await Captain.findById(req.captain.id);

    if (!captain) {
      return res.status(404).json({ message: "Captain not found" });
    }

    res.status(200).json({ captain });
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
}

};

export default captainController;


// console.log("controller loaded");

// const captainController = {
//   registerCaptain: (req, res) => {
//     res.json({ ok: true });
//   }
// };

// export default captainController;


