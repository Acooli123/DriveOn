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


