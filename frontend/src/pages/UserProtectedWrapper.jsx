import React from 'react'
import { useContext,useState, useEffect } from "react";
import { UserDataContext } from "../context/UserDataContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const UserProtectedWrapper = ({
    children
}) => {
    const { setUser } = useContext(UserDataContext)
    const [ isLoading, setIsLoading ] = useState(true)
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  console.log(token);

  useEffect(() => {
    if(!token){
        navigate('/login')
    }

    axios.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
                console.log('User Profile Data:', response.data.user)
                setIsLoading(false)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
  }, [token])

   if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
  

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectedWrapper
