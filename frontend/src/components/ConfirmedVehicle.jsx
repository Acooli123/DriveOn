import React from 'react'

const ConfirmedVehicle = (props) => {
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
  const distance = fare?.distance || "--";
  const duration = fare?.duration || "--";

  return (
    <div>
      <h5
        className="text-center top-0 text-gray-300"
        onClick={() => {
          props.setconfirmVehiclePanel(false);
        }}
      >
        <i className="text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold mb-5">Confirm Your Ride</h3>

      <div className='flex flex-col gap-2'>
        <img 
          className='h-24 w-auto object-contain' 
          src={vehicleImage} 
          alt={vehicleName} 
        />
        
        {/* Vehicle Info */}
        <div className="w-full mt-3 text-center">
          <h4 className="text-xl font-semibold">{vehicleName}</h4>
          <p className="text-sm text-gray-600">
            {distance} km • {duration} min
          </p>
          <p className="text-sm text-gray-500">
            <i className="ri-user-3-fill"></i> {selectedVehicle?.capacity ?? '--'} seats
          </p>
        </div>

        <div className='w-full mt-4'>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl font-semibold ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{pickupLocation || 'Pickup Location'}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Pickup point</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-2 border-b-2'>
                <i className="text-xl ri-map-pin-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>{dropoffLocation || 'Drop-off Location'}</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Destination</p>
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
        <button 
          onClick={()=>{
              props.setdriverFound(true)
              props.setconfirmVehiclePanel(false);
          }} 
          className='w-full p-3 mt-2 bg-green-400 rounded-lg text-xl text-white font-semibold'
        >
          Confirm
        </button>
      </div>
      
    </div>
  )
}

export default ConfirmedVehicle