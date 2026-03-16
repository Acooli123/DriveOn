import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainDataContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!token) {
      navigate("/captain-login");
      return;
    }

    const fetchCaptain = async () => {
      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/captains/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data.captain);
        }

        setLoading(false);

      } catch (error) {

        console.error("Error fetching captain data:", error);

        localStorage.removeItem("token");
        navigate("/captain-login");

      }
    };

    fetchCaptain();

  }, [token, navigate, setCaptain]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectedWrapper;