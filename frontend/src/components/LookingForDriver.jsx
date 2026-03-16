import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div>
      <h5
        className="text-center top-0 text-gray-300"
        onClick={() => {
          props.setvehiclefound(false);
        }}
      >
        <i className="text-3xl ri-arrow-down-wide-fill"></i>
      </h5>

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

      </div>
    </div>
  )
}

export default LookingForDriver
