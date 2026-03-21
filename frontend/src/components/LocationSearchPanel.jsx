import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LocationSearchPanel = (props) => {
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)
    
    // Get the search value based on active input
    const searchValue = props.activeInput === 'pickup' ? props.pickupLocation : props.dropoffLocation

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!searchValue || searchValue.length < 3) {
                setSuggestions([])
                return
            }
            setLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/maps/get-suggestions`, {
                    params: { input: searchValue }
                })
                
                if (response.data) {
                    const formattedSuggestions = response.data.map(item =>
                        typeof item === 'string'
                            ? item
                            : item.description || ''
                    )

                    setSuggestions(formattedSuggestions)
                }
            } catch (error) {
                console.error('Error fetching suggestions:', error)
                setSuggestions([])
            } finally {
                setLoading(false)
            }
        }

        // Debounce the API call
        const timeoutId = setTimeout(fetchSuggestions, 300)
        
        return () => clearTimeout(timeoutId)
    }, [searchValue])

    const handleSuggestionClick = (suggestion) => {
        if (props.activeInput === 'pickup') {
            props.setPickupLocation(suggestion)
        } else {
            props.setDropoffLocation(suggestion)
        }
        setSuggestions([])
        
        // Only open vehicle panel if both pickup and dropoff locations are set
        const pickup = props.activeInput === 'pickup' ? suggestion : props.pickupLocation
        const dropoff = props.activeInput === 'dropoff' ? suggestion : props.dropoffLocation
        
        if (pickup && dropoff) {
            props.setVehiclePanel(true)
            props.setPanelOpen(false)
        } else {
            props.setVehiclePanel(false)
        }
    }

    // Show sample locations when no suggestions are loaded
    const showSampleLocations = suggestions.length === 0 && !loading && props.panelOpen
    
    const sampleLocations = [
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
            {loading && (
                <div className="flex items-center justify-center p-4">
                    <div className="text-gray-500">Loading suggestions...</div>
                </div>
            )}
            
            {suggestions.length > 0 ? (
                suggestions.map((suggestion, index) => (
                    <div
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className='flex items-center gap-4 my-2 border-gray border-2 active:border-black rounded-lg justify-start cursor-pointer'
                    >
                        <h2 className='bg-[#eee] h-10 w-10 ml-3 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-fill text-xl"></i>
                        </h2>
                        <h4 className="font-medium">
                            {suggestion || "Unknown location"}
                        </h4>
                    </div>
                ))
            ) : (
                showSampleLocations && sampleLocations.map((location, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            if (props.activeInput === 'pickup') {
                                props.setPickupLocation(location)
                            } else {
                                props.setDropoffLocation(location)
                            }
                            
                            // Only open vehicle panel if both pickup and dropoff locations are set
                            const pickup = props.activeInput === 'pickup' ? location : props.pickupLocation
                            const dropoff = props.activeInput === 'dropoff' ? location : props.dropoffLocation
                            
                            if (pickup && dropoff) {
                                props.setVehiclePanel(true)
                                props.setPanelOpen(false)
                            } else {
                                props.setVehiclePanel(false)
                            }
                        }}
                        className='flex items-center gap-4 my-2 border-gray border-2 active:border-black rounded-lg justify-start cursor-pointer'
                    >
                        <h2 className='bg-[#eee] h-10 w-10 ml-3 flex items-center justify-center rounded-full'>
                            <i className="ri-map-pin-fill text-xl"></i>
                        </h2>
                        <h4 className="font-medium">{location}</h4>
                    </div>
                ))
            )}
        </div>
    )
}

export default LocationSearchPanel
