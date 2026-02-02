import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const CaptainLogin = () => {
     const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});
    const submitHandler = (e) => {
        e.preventDefault();
        //console.log("hello");
        setCaptainData({email, password});
        console.log(captainData);
        
        setEmail("");
        setPassword("");
    }
        
  return (
    <div className="flex flex-col p-7 justify-between h-screen">
      <h2 className="text-2xl text-black mt-2 font-bold pl-5 ">DriveOn⟶</h2>
      <form onSubmit={(e) => {submitHandler(e)}} className="flex flex-col">
        <h2 className="text-xl font-medium mt-5 text-center">
          What's your email address?
        </h2>
        <div className="flex flex-col items-center mt-5">
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 rounded-md p-2 w-80"
          />
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 w-80 mt-2"
          />
          <button className="flex items-center justify-center w-80 mt-3 bg-black text-white py-2 rounded">
            login
          </button>
        </div>
        <p className="text-center mt-2">
          Join a fleet?{" "}
          <Link to="/captain-signup" className="mt-5 text-blue-500">
            Register as Captain
          </Link>
        </p>
      </form>
      <Link
        to="/login"
        className="flex items-center ml-5 text-lg justify-center w-80  bg-green-500 text-white px-4 py-2 rounded"
      >
        sign in as user
      </Link>
    </div>
  );
}

export default CaptainLogin
