import React from 'react'

const WaitingForDriver = (props) => {
  const { selectedVehicle, fare, pickupLocation, dropoffLocation } = props;

  // Format fare
  const formatFare = (fareValue) => {
    if (fareValue === undefined || fareValue === null) return "--";
    return `₹${fareValue}`;
  };

   // Get the vehicle image, name and fare
  const vehicleImage = selectedVehicle?.image || "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n";
  const vehicleName = selectedVehicle?.name || "Vehicle";
  const vehicleFare = selectedVehicle?.fare || fare?.bike || fare?.nonAcCar || fare?.acCar || fare?.shuttle;
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
      <h3 className="text-2xl font-bold mb-5">Looking for a Driver</h3>
      
      <div className='flex flex-col justify-between items-center'>
        <img className="h-12" src={vehicleImage} 
          alt={vehicleName} />
        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl font-semibold ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>583, Anada Negi Lane Road</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{pickupLocation}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>Hare School</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{dropoffLocation}</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2'>
                <i className="text-xl font-semibold ri-hand-coin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{formatFare(vehicleFare)}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash, UPI</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  )
}

export default WaitingForDriver
