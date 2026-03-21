import React from "react";
import { useState, useRef } from "react";
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

  const submitHandler = (e) => {
    e.preventDefault();
    // Open vehicle panel when both pickup and dropoff have values
    if (pickupLocation && dropoffLocation) {
      setShowVehiclePanel(true)
    }
  }

  // Handle pickup location change
  const handlePickupChange = (e) => {
    const value = e.target.value
    setPickupLocation(value)
    setActiveInput('pickup')
    // Close vehicle panel if either field is empty
    if (!value || !dropoffLocation) {
      setShowVehiclePanel(false)
    }
  }

  // Handle dropoff location change
  const handleDropoffChange = (e) => {
    const value = e.target.value
    setDropoffLocation(value)
    setActiveInput('dropoff')
    // Close vehicle panel if either field is empty
    if (!value || !pickupLocation) {
      setShowVehiclePanel(false)
    }
  }

  useGSAP(function() {   
    if(showMap){
      gsap.to(panelRef.current, {
        height: "70vh", duration: 1, padding: "5px", ease: "power2.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1, duration: 1, ease: "power2.out", delay: 0.5
      })
    }else{
      gsap.to(panelRef.current, {
        height: "0", duration: 1, padding: "0", ease: "power2.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0, duration: 1, ease: "power2.out"
      })
    }
      
  }, [showMap])

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
          onSubmit={(e) => {submitHandler(e)}}>
            <div className="line absolute h-16 w-1 top-[45%] bg-gray-800 left-20 rounded-full"></div>
            <input
              onClick={()=>{
                setShowMap(true)
                setActiveInput('pickup')
              }}
              value={pickupLocation}
              onChange={handlePickupChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (pickupLocation && dropoffLocation) {
                    setShowVehiclePanel(true)
                  }
                }
              }}
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
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  if (pickupLocation && dropoffLocation) {
                    setShowVehiclePanel(true)
                  }
                }
              }}
              className="bg-[#eee] px-8 py-2 text-lg rounded-lg"
              type="text"
              placeholder="Add a drop-off location"
            />
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0">
            <LocationSearchPanel 
                panelOpen = {showMap} 
                setPanelOpen = {setShowMap} 
                vehiclePanel = {showVehiclePanel} 
                setVehiclePanel={setShowVehiclePanel}
                pickupLocation={pickupLocation}
                setPickupLocation={setPickupLocation}
                dropoffLocation={dropoffLocation}
                setDropoffLocation={setDropoffLocation}
                activeInput={activeInput}
            />
        </div>
      </div >
      <div ref={vehiclePanelRef} className="fixed bg-white z-10 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <VehiclePanel setconfirmVehiclePanel = {setconfirmVehiclePanel} setShowVehiclePanel={setShowVehiclePanel} />
      </div>

      <div ref={confirmedVehiclePanelRef} className="fixed bg-white z-20 bottom-0 translate-y-full px-3 py-6 pt-12 w-full">
        <ConfirmedVehicle setconfirmVehiclePanel = {setconfirmVehiclePanel} setvehiclefound={setvehiclefound}/>
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
