import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainDataContext";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");

  // Vehicle state variables
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehicleLicensePlate, setVehicleLicensePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");

const submitHandler = async (e) => {
  e.preventDefault();

  // Client-side validation
  if (firstname.length < 3) {
    alert("First name must be at least 3 characters long");
    return;
  }
  if (lastname.length < 3) {
    alert("Last name must be at least 3 characters long");
    return;
  }
  if (!vehicleColor) {
    alert("Vehicle color is required");
    return;
  }
  if (vehicleLicensePlate.length < 3) {
    alert("License plate must be at least 3 characters long");
    return;
  }
  if (!vehicleCapacity || Number(vehicleCapacity) < 1) {
    alert("Capacity must be at least 1");
    return;
  }
  if (!vehicleType) {
    alert("Please select a vehicle type");
    return;
  }

  const newCaptain = {
    fullName: {
      firstName: firstname,
      lastName: lastname,
    },
    email,
    password,
    vehicle: {
      color: vehicleColor,
      licensePlate: vehicleLicensePlate,
      capacity: Number(vehicleCapacity),
      vehicleType,
    },
    age: Number(age),
    experience: Number(experience),
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/captains/register`,
      newCaptain
    );

    const data = response.data;

    setCaptain(data.captain);
    localStorage.setItem("captain-token", data.token);
    navigate("/captain-home");

  } catch (error) {
    console.log("Signup error:", error.response?.data || error.message);
  }

  setemail("");
  setpassword("");
  setfirstname("");
  setlastname("");
  setVehicleColor("");
  setVehicleLicensePlate("");
  setVehicleCapacity("");
  setVehicleType("");
  setAge("");
  setExperience("");
};
  return (
    <div className="flex flex-col p-7 justify-between h-screen">
      <h2 className="text-2xl text-black mt-2 font-bold pl-5 ">DriveOn⟶</h2>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col"
      >
        <h2 className="text-xl font-medium mt-5 justify-center text-center">
          Captain Information
        </h2>
        <div className="flex gap-4 mt-5">
          <input
            onChange={(e) => setfirstname(e.target.value)}
            value={firstname}
            type="text"
            placeholder="firstname"
            className="border border-gray-300 rounded-md p-2 w-1/2"
          />
          <input
            onChange={(e) => setlastname(e.target.value)}
            value={lastname}
            type="text"
            placeholder="lastname"
            className="border border-gray-300 rounded-md p-2 w-1/2"
          />
          
        </div>
        <div className="flex gap-4 mt-5">
            <input
              onChange={(e) => setAge(e.target.value)}
              value={age}
              type="number"
              placeholder="Age"
              min="18"
              max="65"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            <input
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              type="number"
              placeholder="Experience (years)"
              min="0"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
          </div>
        <h2 className="text-xl font-medium mt-5 text-center">
          What's our Captain's email?
        </h2>
        <div className="flex flex-col items-center mt-5">
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-md p-2 w-80"
          />
          <input
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 w-80 mt-2"
          />
        </div>
        <h2 className="text-xl font-medium mt-5 text-center">
          Vehicle Information
        </h2>
        <div className="flex flex-col items-center mt-3 gap-3">
          <div className="flex gap-3 w-80">
            <input
              onChange={(e) => setVehicleColor(e.target.value)}
              value={vehicleColor}
              type="text"
              placeholder="Vehicle Color"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            <input
              onChange={(e) => setVehicleLicensePlate(e.target.value)}
              value={vehicleLicensePlate}
              type="text"
              placeholder="License Plate"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
          </div>
          <div className="flex gap-3 w-80">
            <input
              onChange={(e) => setVehicleCapacity(e.target.value)}
              value={vehicleCapacity}
              type="number"
              placeholder="Capacity"
              min="1"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            <select
              onChange={(e) => setVehicleType(e.target.value)}
              value={vehicleType}
              className="border border-gray-300 rounded-md px-2 py-1 w-40 text-sm"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car A/C">Car A/C</option>
              <option value="car non-A/C">Car Non-A/C</option>
              <option value="bike">Bike</option>
              <option value="shuttle">Shuttle</option>
            </select>
          </div>
          
        </div>
        <div className="flex flex-col items-center mt-5">
          <button className="flex items-center justify-center w-80 bg-black text-white py-2 rounded">
            Create account
          </button>
        </div>
        <p className="text-center mt-2">
          Already have an account?{" "}
          <Link to="/captain-login" className="mt-5 text-blue-500">
            login here
          </Link>
        </p>
      </form>
      <p className="text-[10px] mt-6 leading-tight">
        This site is protected by reCAPTCHA and the{" "}
        <span className="underline">Google Privacy Policy</span> and{" "}
        <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  );
};

export default CaptainSignup;
