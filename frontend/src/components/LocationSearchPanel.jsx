import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props);
    

    //sample array of locations
    const locations = [
        "F1 Grahm Road, Ashoknagar, Tollygaunge, Kolkata-700024",
        "West Chowbaga Rd, Anandapur, Mundapara, Kolkata, West Bengal 700107",
        "1, Raja Dinendra St, Fariapukur, Shyam Bazar, Kolkata, West Bengal 700004",
        "583, Anada Negi Lane Road, Bag Bazar Colony, Baghbazar, Kolkata, West Bengal 700003",
        "87, College St, Calcutta University, College Square, Kolkata, West Bengal 700073",
        "H87R+F4W, Gostho Paul Sarani, Maidan, B.B.D. Bagh, Kolkata, West Bengal 700021",
        "HC95+JJF, JB Block, Sector 3, Bidhannagar, Kolkata, West Bengal 700106"
    ]
  return (
    <div>
      {locations.map((location, index) => {
        return (
          <div
            key={index}
            onClick={() => {
                props.setVehiclePanel(true)
                props.setPanelOpen(false)
            }}
            className='flex items-center gap-4 my-2 border-gray border-2 active:border-black rounded-lg justify-start'
          >
            <h2 className='bg-[#eee] h-10 w-10 ml-3 flex items-center justify-center rounded-full'>
              <i className="ri-map-pin-fill text-xl"></i>
            </h2>
            <h4 className='font-medium'>{location}</h4>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel