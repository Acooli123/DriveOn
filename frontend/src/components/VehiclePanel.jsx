import React from "react";

const VehiclePanel = (props) => {
  const { fare, setSelectedVehicle } = props;
  
  console.log('VehiclePanel received fare:', fare);
  
  // Vehicle data for each type
  const vehicleData = {
    bike: {
      name: 'DriveOn-Moto',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n',
      capacity: 1,
      description: 'Affordable, motorcycle rides'
    },
    nonAcCar: {
      name: 'Mini non-A/C',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n',
      capacity: 3,
      description: 'Affordable, compact rides'
    },
    acCar: {
      name: 'DriveOn-Go A/C',
      image: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NWEwNTUzOC05MThiLTQyZDgtYWZlNy0zYzkyMzI1ZjJmZDQucG5n',
      capacity: 4,
      description: 'Comfortable, AC rides'
    },
    shuttle: {
      name: 'DriveOn-Shuttle',
      image: 'https://www.svgrepo.com/show/408290/car-white.svg',
      capacity: 5,
      description: 'Shared shuttle service'
    }
  };
  
  // Handle vehicle selection
  const handleVehicleSelect = (vehicleType) => {
    const vehicle = vehicleData[vehicleType];
    const vehicleFare = fare?.[vehicleType];
    
    setSelectedVehicle({
      type: vehicleType,
      name: vehicle.name,
      image: vehicle.image,
      capacity: vehicle.capacity,
      description: vehicle.description,
      fare: vehicleFare
    });
    
    props.setconfirmVehiclePanel(true);
    props.setShowVehiclePanel(false);
  };
  
  // Helper function to format fare
  const formatFare = (fareValue) => {
    console.log('formatFare value:', fareValue);
    if (!fareValue && fareValue !== 0) return "--";
    return `₹${fareValue}`;
  };

  return (
    <div>
      <h5
        className="text-center top-0 text-gray-300"
        onClick={() => {
          props.setShowVehiclePanel(false);
          props.setShowVehiclePanel(false);
        }}
      >
        <i className="text-3xl ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-bold mb-5">Choose a Vehicle</h3>
      
      {/* DriveOn-Moto (Bike) */}
      <div
        onClick={() => handleVehicleSelect('bike')}
        className="flex border-2 active:border-black rounded-xl mb-2 p-3 bg-[rgb(186,207,116)] items-center justify-between"
      >
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mY2RkZWNhYS0yZWVlLTQ4ZmUtODdmMC02MTRhYTdjZWU3ZDMucG5n"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-semibold text-lg">
            DriveOn-Moto
            <span>
              <i className="ri-user-3-fill ml-3"></i>1
            </span>
          </h4>
          <h5 className="text-sm text-gray-600">
            {fare?.distance ? `${fare.distance} km` : '-- km'} • {fare?.duration ? `${fare.duration} min` : '-- min'}
          </h5>
          <p className="font-medium text-sm">Affordable, motorcycle rides</p>
        </div>
        <h2 className="text-2xl font-semibold">{formatFare(fare?.bike)}</h2>
      </div>

      {/* Mini non-A/C (nonAcCar) */}
      <div
        onClick={() => handleVehicleSelect('nonAcCar')}
        className="flex border-2 active:border-black rounded-xl mb-2 p-3 bg-[rgb(186,207,116)] items-center justify-between"
      >
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-semibold text-lg">
            Mini non-A/C
            <span>
              <i className="ri-user-3-fill ml-3"></i>3
            </span>
          </h4>
          <h5 className="text-sm text-gray-600">
            {fare?.distance ? `${fare.distance} km` : '-- km'} • {fare?.duration ? `${fare.duration} min` : '-- min'}
          </h5>
          <p className="font-medium text-sm">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">{formatFare(fare?.nonAcCar)}</h2>
      </div>

      {/* DriveOn-Go A/C (acCar) */}
      <div onClick={() => handleVehicleSelect('acCar')} className="flex border-2 active:border-black rounded-xl mb-2 p-3 bg-[rgb(186,207,116)] items-center justify-between">
        <img
          className="h-12"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NWEwNTUzOC05MThiLTQyZDgtYWZlNy0zYzkyMzI1ZjJmZDQucG5n"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-semibold text-lg">
            DriveOn-Go A/C
            <span>
              <i className="ri-user-3-fill ml-3"></i>4
            </span>
          </h4>
          <h5 className="text-sm text-gray-600">
            {fare?.distance ? `${fare.distance} km` : '-- km'} • {fare?.duration ? `${fare.duration} min` : '-- min'}
          </h5>
          <p className="font-medium text-sm">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">{formatFare(fare?.acCar)}</h2>
      </div>

      {/* DriveOn-Shuttle (shuttle) */}
      <div onClick={() => handleVehicleSelect('shuttle')} className="flex border-2 active:border-black rounded-xl mb-2 p-3 bg-[rgb(186,207,116)] items-center justify-between">
        <img
          className="h-20"
          src="https://www.svgrepo.com/show/408290/car-white.svg"
          alt=""
        />
        <div className="ml-2 w-1/2">
          <h4 className="font-semibold text-lg">
            DriveOn-Shuttle
            <span>
              <i className="ri-user-3-fill ml-3"></i>5
            </span>
          </h4>
          <h5 className="text-sm text-gray-600">
            {fare?.distance ? `${fare.distance} km` : '-- km'} • {fare?.duration ? `${fare.duration} min` : '-- min'}
          </h5>
          <p className="font-medium text-sm">Affordable, compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">{formatFare(fare?.shuttle)}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
