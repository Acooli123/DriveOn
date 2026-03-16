import { useState } from "react";
import { CaptainDataContext } from "./CaptainDataContext";

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    vehicle: {
      color: "",
      licensePlate: "",
      capacity: "",
      vehicleType: "",
    },
    status: "available",
  });

  const[ isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const updateCaptain = (updatedData) => {
    setCaptain((prevCaptain) => ({
      ...prevCaptain,
      ...updatedData,
    }));
  };

  const value = {
    captain,
    setCaptain: updateCaptain,
    isLoading,  
    setIsLoading,
    error,
    setError,
    updateCaptain
  };

  return (
    <CaptainDataContext.Provider value={value}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
