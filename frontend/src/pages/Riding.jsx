import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className="h-screen">
        <Link to="/home" className='fixed p-3 right-2 top-2 h-15 w-15 bg-white flex items-center justify-center rounded-full'>
            <i className=" text-3xl font-semibold ri-home-4-line"></i>
        </Link>

      <h2 className="absolute text-2xl text-black mt-2 font-bold pl-5">
        DriveOn
      </h2>

      <div className="w-screen h-screen">
        <img
          className="w-full h-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="DriveOn map image"
        />
      </div>

      {/* Payment panel */}
      <div className="absolute bottom-0 w-full bg-white p-4">
        <div className="flex items-center justify-between">
        {/* Left side (images close together) */}
        <div className="flex items-center gap-0.3">
            <img className="h-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEoB8px2hd20zM9etevT9XY9DnpQdezUVhHQ&s"alt=""/>
            <img className="h-12" src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"alt=""/>
        </div>

        {/* Right side */}
        <div className="text-right">
            <h2 className="text-lg font-medium">Samir Acooli</h2>
            <h4 className="text-2xl font-bold mt-1 -mb-1">WB12AB1234</h4>
            <p className="text-sm text-gray-600">TATA MOTORS ALTO</p>
            <i className="text-sm ri-star-fill">4.9</i>
        </div>
     </div>

        <div className="flex flex-col justify-between items-center">
          
          <div className="w-full mt-5">

            <div className="flex items-center gap-5 p-2 border-b-2">
              <i className="text-xl font-semibold ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-lg font-medium">583, Anada Negi Lane Road</h3>
                <p className="text-sm text-gray-600">Baghbazar, Kolkata</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-2 border-b-2">
              <i className="text-xl ri-map-pin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">Hare School</h3>
                <p className="text-sm text-gray-600">College Street, Kolkata</p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-2">
              <i className="text-xl font-semibold ri-hand-coin-fill"></i>
              <div>
                <h3 className="text-lg font-medium">₹145.40</h3>
                <p className="text-sm text-gray-600">Cash, UPI</p>
              </div>
            </div>

          </div>
        </div>

        <button className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg text-lg">
          Make a Payment
        </button>

      </div>

    </div>
  )
}

export default Riding