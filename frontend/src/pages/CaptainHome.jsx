import React from "react";
import { useState, useRef } from "react";
import { useGSAP} from '@gsap/react';
import { gsap } from "gsap";
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'

const CaptainHome = () => {

  const popUpPanelRef = useRef(null);
  const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
  const confirmRidePopUpPanelRef = useRef(null);
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)

  useGSAP(function() {   
    if(ridePopUpPanel){
      gsap.to(popUpPanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(popUpPanelRef.current, {
        transform:"translateY(100%)"
      })
    }
      
  }, [ridePopUpPanel])

  useGSAP(function() {
    if(confirmRidePopUpPanel){
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform:"translateY(0)"
      })
    }else{
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform:"translateY(100%)"
      })
    }
  }, [confirmRidePopUpPanel])

  return (
    <div className="h-screen">

      {/* Logout Button */}
      <Link 
        to="/captain-home" 
        className="fixed p-3 right-2 top-2 h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-md"
      >
        <i className="text-2xl ri-logout-box-r-line"></i>
      </Link>

      {/* Logo */}
      <h2 className="absolute text-2xl text-black mt-2 font-bold pl-5">
        DriveOn
      </h2>

      {/* Background Image */}
      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="DriveOn map image"
        />
      </div>

      {/* Bottom Section */}
      <CaptainDetails />
      <div ref={popUpPanelRef} className="fixed bg-white z-10 bottom-0 translate-y-0 px-3 py-6 pt-12 w-full">
        <RidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>

      <div ref={confirmRidePopUpPanelRef} className="fixed bg-white z-10 h-screen bottom-0 translate-y-0 px-3 py-6 pt-12 w-full">
        <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
      </div>

    </div>
  )
}

export default CaptainHome