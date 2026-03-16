import Captain from "../models/captain.model.js";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  licensePlate,
  capacity,
  vehicleType,
  age,
  experience
}) => {

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !licensePlate ||
    !capacity ||
    !vehicleType ||
    !age ||
    !experience
  ) {
    throw new Error("All fields are required");
  }

  const existingCaptain = await Captain.findOne({ email });
  if (existingCaptain) throw new Error("Captain already exists");

  const newCaptain = new Captain({
    fullName: {
      firstName,
      lastName
    },
    email,
    password,
    vehicle: {
      color,
      licensePlate,
      capacity,
      vehicleType
    },
    age,
    experience
  });

  await newCaptain.save();
  return newCaptain;
};
