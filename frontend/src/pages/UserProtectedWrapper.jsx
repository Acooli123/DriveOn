import React from 'react'
import { useContext, useEffect } from "react";
import { UserDataContext } from "../context/UserDataContext.jsx";
import { useNavigate } from "react-router-dom";

const UserProtectedWrapper = ({
    children
}) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(token);

  useEffect(() => {
    if(!token){
        navigate('/login')
    }
  }, [token])
  

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
