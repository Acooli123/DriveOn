import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className="h-1/2 p-6 bg-white absolute bottom-0 w-full rounded-t-2xl">

        <div className="flex items-center gap-3">
          {/* Image */}
          <img
            src="https://sudiptapal.com/wp-content/uploads/2025/12/Untitled-design.webp"
            alt="Captain"
            className="w-12 h-12 rounded-full"
          />

          {/* Name */}
          <h1 className="text-xl font-semibold">
            {captain?.fullName?.firstName || "Loading..."}{" "}
            {captain?.fullName?.lastName || ""}
          </h1>
          {/* Price (move right) */}
          <div className="ml-auto text-right">
            <h3 className="text-2xl font-semibold">₹145.40</h3>
            <p className='text-gray-500 text-sm'>Earned</p>
          </div>
        </div>
        <div>
          <h4>Experience: {captain?.experience || "N/A"} years</h4>
          <h4>Rating: <span><i className="text-sm ri-star-fill">{captain?.rating || "4.9"}</i></span></h4>
        </div>

        <div className='flex justify-center gap-5 items-start mt-8 bg-gray-100 p-4 rounded-xl'>

          <div className="text-center">
            <i className="text-3xl font-thin ri-time-line"></i>
            <h5 className = "text-lg font-medium">10.2</h5>
            <p className = "text-sm text-gray-500">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl font-thin ri-speed-up-line"></i>
            <h5 className = "text-lg font-medium">10.2</h5>
            <p className = "text-sm text-gray-500">Hours Online</p>
          </div>
          <div className="text-center">
            <i className="text-3xl font-thin ri-booklet-fill"></i>
            <h5 className = "text-lg font-medium">10.2</h5>
            <p className = "text-sm text-gray-500">Hours Online</p>
          </div>

        </div>

      </div>
  )
}

export default CaptainDetails
