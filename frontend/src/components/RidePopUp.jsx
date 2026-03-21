import React from 'react'

const RidePopUp = (props) => {

  return (
    <div>
      <h5
        className="text-center top-0 text-gray-300"
        onClick={() => {
            props.setRidePopUpPanel(false)
        }}
      >
        <i className="text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold mb-5">New Ride Available!</h3>

      <div className='flex items-center justify-between bg-yellow-500 p-3 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/736x/58/d1/85/58d185848a44f78558c2df1d82ea91f0.jpg" alt="user" />
            <h2 className='text-xl font-medium'>Sayan Paul</h2>
        </div>
        <h5 className='text-xl font-semibold'>2.2 km</h5>
      </div>

      <div className='flex flex-col justify-between items-center'>
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl font-semibold ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>583, Anada Negi Lane Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Baghbazar, Kolkata, West Bengal 700003</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>Hare School</h3>
                    <p className='text-sm -mt-1 text-gray-600'>87, College St, Calcutta University, College Square, Kolkata, West Bengal 700073</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2'>
                <i className="text-xl font-semibold ri-hand-coin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>₹145.40</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash, UPI</p>
                </div>
            </div>
        </div>
        <div className="flex mt-5 w-full items-center justify-between">
            <button onClick={()=>{
                props.setRidePopUpPanel(false)
            }} className='px-8 p-2 mt-2 bg-gray-400 text-gray-700 rounded-lg text-xl text-white font-semibold'>Ignore</button>
            <button onClick={()=>{
                props.setConfirmRidePopUpPanel(true)
                props.setRidePopUpPanel(false)
            }} className='px-8 p-2 mt-2 bg-green-500 rounded-lg text-xl text-white font-semibold'>Accept</button>
        </div>
      </div>
      
    </div>
  )
}

export default RidePopUp
