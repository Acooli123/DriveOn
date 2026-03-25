import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext.jsx";

const UserLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const { user, setUser } = useContext(UserDataContext);
    const submitHandler = async (e) => {
        e.preventDefault();
        //console.log("hello");
        const userData = {
          email: email,
          password: password
        }
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/users/login`,
            userData,
            { withCredentials: true }
          );
          if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem("token", data.token);
            navigate("/home");
          }
        } catch (error) {
          console.log("Backend error:", error.response.data);
        }

        console.log(userData);
        
        setEmail("");
        setPassword("");
    }
        
  return (
    <div className="flex flex-col p-7 justify-between h-screen">
      <h2 className="text-2xl text-black mt-2 font-bold pl-5 ">DriveOn</h2>
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
          New here?{" "}
          <Link to="/signup" className="mt-5 text-blue-500">
            Create new Account
          </Link>
        </p>
      </form>
      <Link
        to="/captain-login"
        className="flex items-center ml-5 text-lg justify-center w-80  bg-[#D9C75C] text-white px-4 py-2 rounded"
      >
        sign in as captain
      </Link>
    </div>
  );
};

export default UserLogin;
