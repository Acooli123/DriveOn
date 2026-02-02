import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainSignup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [captainData, setcaptainData] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setcaptainData({
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
    });
    setemail("");
    setpassword("");
    setfirstname("");
    setlastname("");
    console.log(captainData);
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
          What's our Captain's name?
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
          <button className="flex items-center justify-center w-80 mt-3 bg-black text-white py-2 rounded">
            Register
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
