import axios from 'axios';

export const mapService = {
    getAddressCoordinate: async (address) => {
        const apiKey = process.env.GOOGLE_MAPS_API;

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);
            

            if (response.data.status === 'OK') {
                const location = response.data.results[0].geometry.location;

                return {
                    lat: location.lat,
                    lng: location.lng
                };
            }

            throw new Error('Unable to geocode address');
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            throw error;
        }
    },

    getDistanceTime: async (origin, destination) => {
        if (!origin || !destination) {
            throw new Error('Origin and destination are required');
        }

        const apiKey = process.env.GOOGLE_MAPS_API;
        const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

        try {
            const response = await axios.get(url);
            console.log(response.data);

            if (response.data.status === 'OK') {
                if (response.data.rows[0].elements[0].status === 'OK') {
                    const element = response.data.rows[0].elements[0];
                    return {
                        distance: element.distance.value, // in meters
                        duration: element.duration.value, // in seconds
                        distanceText: element.distance.text,
                        durationText: element.duration.text
                    };
                }else{
                    throw new Error('Unable to calculate distance and time');
                }
                
            }

        } catch (error) {
            console.error('Error fetching distance and time:', error);
            throw error;
        }
    },

    getSuggestions: async (input) => {
    try {
        if (!input) {
            throw new Error('Input is required');
        }

        const apiKey = process.env.GOOGLE_MAPS_API;

        if (!apiKey) {
            throw new Error('Google Maps API key missing');
        }

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;

        const response = await axios.get(url, {
            params: {
                input: input,
                key: apiKey
            }
        });

        console.log("Google API Response:", response.data);

        // ✅ Handle different statuses properly
        if (response.data.status === 'OK') {
            return response.data.predictions.map(p => p.description);
        }

        if (response.data.status === 'ZERO_RESULTS') {
            return []; // ✅ NOT an error
        }

        // ❌ Real errors
        throw new Error(response.data.error_message || response.data.status);

    } catch (error) {
        console.error('Error fetching suggestions:', error.message);
        throw error;
    }
}
};