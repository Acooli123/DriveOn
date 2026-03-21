import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useRef } from "react";
import { useGSAP} from '@gsap/react';
import { gsap } from "gsap";
import FinishRide from '../components/FinishRide';


const CaptainRiding = () => {

    const [finishPanel, setFinishPanel] = useState(false)
    const finishRidePanelRef = useRef(null)

    useGSAP(function() {
        if(finishPanel){
        gsap.to(finishRidePanelRef.current, {
            transform:"translateY(0)"
        })
        }else{
        gsap.to(finishRidePanelRef.current, {
            transform:"translateY(100%)"
        })
        }
    }, [finishPanel])

  return (
    <div className="h-screen  absolute">

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

      <div className="h-1/6 p-6 bg-yellow-400 absolute flex items-center justify-between bottom-0 w-full"
       onClick={()=> {
        setFinishPanel(true)
       }}>   
        <h5 className="absolute top-0 left-1/2 -translate-x-1/2 text-black-500" onClick={() => {}}>
            <i className="text-3xl font-semibold ri-arrow-up-wide-fill"></i>
        </h5>
        <h4 className='text-2xl font-semibold'>4 km away</h4>
        <button className='px-8 p-4 mt-2 bg-green-500 rounded-lg text-xl text-white font-semibold'>Complete Ride</button>
      </div>

      <div ref={finishRidePanelRef} className="fixed bg-white z-10 bottom-0 translate-y-0 px-3 py-6 pt-12 w-full">
        <FinishRide setFinishPanel={setFinishPanel}/>
      </div>

    </div>
  )
}

export default CaptainRiding
