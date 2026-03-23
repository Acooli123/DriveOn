import React from "react";
import axios from 'axios'
import { useState, useRef } from "react";

// Configure axios base URL
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
import { useGSAP} from '@gsap/react';
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedVehiclePanelRef = useRef(null);
  const vehiclefoundPanelRef = useRef(null); 
  const driverfoundPanelRef = useRef(null); 
  const [showMap, setShowMap] = useState(false);
  const [showVehiclePanel, setShowVehiclePanel] = useState(false);
  const [confirmVehiclePanel, setconfirmVehiclePanel] = useState(false);
  const [vehiclefound, setvehiclefound] = useState(false);
  const [driverFound, setdriverFound] = useState(false)
  const [fare, setFare] = useState({});
  const [fareLoading, setFareLoading] = useState(false);
  const [bothLocationsSet, setBothLocationsSet] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  // Handle pickup location change
  const handlePickupChange = (e) => {
    const value = e.target.value
    setPickupLocation(value)
    setActiveInput('pickup')
    // Clear fare when location changes
    setFare({})
    // Close vehicle panel if either field is empty
    if (!value || !dropoffLocation) {
      setShowVehiclePanel(false)
    }
    // Check if both locations are set
    if (value && dropoffLocation) {
      setBothLocationsSet(true)
    } else {
      setBothLocationsSet(false)
    }
  }

  // Handle dropoff location change
  const handleDropoffChange = (e) => {
    const value = e.target.value
    setDropoffLocation(value)
    setActiveInput('dropoff')
    // Clear fare when location changes
    setFare({})
    // Close vehicle panel if either field is empty
    if (!value || !pickupLocation) {
      setShowVehiclePanel(false)
    }
    // Check if both locations are set
    if (pickupLocation && value) {
      setBothLocationsSet(true)
    } else {
      setBothLocationsSet(false)
    }
  }

  useGSAP(function() {   
    if(showMap || pickupLocation || dropoffLocation){
      gsap.to(panelRef.current, {
        height: "70vh", duration: 0.5, padding: "5px", ease: "power2.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1, duration: 0.5, ease: "power2.out"
      })
    } else {
      gsap.to(panelRef.current, {
        height: "0", duration: 0.5, padding: "0", ease: "power2.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0, duration: 0.5, ease: "power2.out"
      })
    }
      
  }, [showMap, pickupLocation, dropoffLocation])

  useGSAP(function() {   
    if(showVehiclePanel){
      gsap.to(vehiclePanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(vehiclePanelRef.current, {
        transform:"translateY(100%)"
      })
    } 
  }, [showVehiclePanel])  
  
  useGSAP(function() {
    if(confirmVehiclePanel){
      gsap.to(confirmedVehiclePanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(confirmedVehiclePanelRef.current, {
        transform:"translateY(100%)"
      })
    }
  }, [confirmVehiclePanel])

  useGSAP(function() {
    if(vehiclefound){
      gsap.to(vehiclefoundPanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(vehiclefoundPanelRef.current, {
        transform:"translateY(100%)"
      })
    }
  }, [vehiclefound])
  
useGSAP(function() {
    if(driverFound){
      gsap.to(driverfoundPanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(driverfoundPanelRef.current, {
        transform:"translateY(100%)"
      })
    }
  }, [driverFound])

  // Test connection to backend
  const testConnection = async () => {
    try {
      const response = await axios.get('/', { 
        timeout: 5000 
      });
      console.log('Backend connection test:', response.status);
      return true;
    } catch (error) {
      console.error('Backend connection test failed:', error.message);
      return false;
    }
  };

  async function findTrip() {
    console.log('findTrip called with:', pickupLocation, dropoffLocation);
    
    if (!pickupLocation || !dropoffLocation) {
      alert('Please enter both pickup and destination');
      return;
    }
    
    try {
      // Close the location search panel and clear locations when Get Fare is clicked
      const pickup = pickupLocation
      const dropoff = dropoffLocation
      setPickupLocation('')
      setDropoffLocation('')
      setShowMap(false);
      setFareLoading(true);
      
      // First test if backend is reachable
      const isBackendUp = await testConnection();
      if (!isBackendUp) {
        alert('Cannot connect to backend. Please make sure the backend server is running on port 4000.');
        setFareLoading(false);
        return;
      }
      
      console.log('Fetching fare for:', pickup, dropoff);
      console.log('API URL:', '/rides/get-fare');
      
      const token = localStorage.getItem('token');
      console.log('Token exists:', !!token);
      
      if (!token) {
        setFareLoading(false);
        alert('Please login first');
        return;
      }
      
      const response = await axios.get('/rides/get-fare', { 
        params: {
          pickup: pickup,
          destination: dropoff
        },
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 15000 // 15 second timeout
      });
      
      console.log('Fare response status:', response.status);
      console.log('Fare response data:', response.data);
      
      setFare(response.data);
      console.log('Fare state set, showing vehicle panel');
      setShowVehiclePanel(true);
    } catch (error) {
      console.error('Failed to get fare:', error);
      console.error('Error message:', error.message);
      console.error('Error response:', error.response);
      console.error('Error request:', error.request);
      
      let errorMessage = 'Failed to get fare. Please try again.';
      
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          errorMessage = 'Please login again. Token expired.';
        } else if (status === 400) {
          errorMessage = data.message || 'Invalid request. Please check pickup and destination.';
        } else if (status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else {
          errorMessage = `Error: ${data.message || error.response.statusText}`;
        }
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Please try again.';
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'Cannot connect to server. Is backend running on port 4000?';
      } else {
        errorMessage = error.message || errorMessage;
      }
      
      alert(errorMessage);
    } finally {
      setFareLoading(false);
    }
  }



  return (
    <div className="h-screen relative overflow-hidden">
      <h2 className="absolute fixed text-2xl text-black mt-2 font-bold pl-5 ">
        DriveOn
      </h2>

      <div onClick={()=>{
        setShowVehiclePanel(false)
      }} className="w-screen h-screen">
        <img className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="DriveOn map image"
        />
      </div>
      <div className="h-screen flex flex-col justify-end absolute top-0 w-full">
        <div className="h-[30%] p-14 bg-white relative">
          <h5 ref={panelCloseRef} onClick={() => setShowMap(false)} className="top-12 left-7 opacity-0 absolute text-xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-3xl font-semibold">Find a trip</h4>
          
          <form className="gap-3 flex flex-col mt-4" 
          onSubmit={(e) => {e.preventDefault();}}>
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-800 left-20 rounded-full"></div>
            <input
              onClick={()=>{
                setShowMap(true)
                setActiveInput('pickup')
              }}
              value={pickupLocation}
              onChange={handlePickupChange}
              
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={()=>{
                setShowMap(true)
                setActiveInput('dropoff')
              }}
              value={dropoffLocation}
              onChange={handleDropoffChange}
           
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg"
              type="text"
              placeholder="Add a drop-off location"
            />
          </form>
          <button 
            type="button"
            onClick={findTrip}
            disabled={fareLoading}
            className="ml-1 bg-black text-white px-4 py-2 mt-5 rounded-lg mb-2 w-full disabled:bg-gray-600"
          >
            {fareLoading ? 'Fetching Fare...' : 'Get Fare'}
          </button>
        </div>
        <div ref={panelRef} className="bg-white h-0">
            <LocationSearchPanel 
                panelOpen = {showMap || pickupLocation || dropoffLocation} 
                setPanelOpen = {setShowMap} 
                vehiclePanel = {showVehiclePanel} 
                setVehiclePanel={setShowVehiclePanel}
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                dropoffLocation={dropoffLocation}
                setDropoffLocation={setDropoffLocation}
                activeInput={activeInput}
                onLocationChange={() => setFare({})}
            />
        </div>
      </div >
      <div ref={vehiclePanelRef} className="fixed bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <VehiclePanel 
          fare={fare} 
          setconfirmVehiclePanel = {setconfirmVehiclePanel} 
          setShowVehiclePanel={setShowVehiclePanel}
          setSelectedVehicle={setSelectedVehicle}
        />
      </div>

      <div ref={confirmedVehiclePanelRef} className="fixed bg-white z-20 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <ConfirmedVehicle 
          setconfirmVehiclePanel = {setconfirmVehiclePanel} 
          setvehiclefound={setvehiclefound}
          selectedVehicle={selectedVehicle}
          fare={fare}
          pickupLocation={pickupLocation}
          dropoffLocation={dropoffLocation}
        />
      </div>

      <div ref={vehiclefoundPanelRef} className="fixed bg-white z-20 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <LookingForDriver setvehiclefound={setvehiclefound}/>
      </div>

      <div ref={driverfoundPanelRef} className="fixed bg-white z-20 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <WaitingForDriver setdriverFound={setdriverFound}/>
      </div>
    </div>
  );
};

export default Home;
