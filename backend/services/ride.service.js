import rideModel from "../models/ride.model.js";
import { mapService } from "./maps.service.js";
import crypto from "crypto";

const RideService = {
    createRide: async ({ user, pickup, destination, vehicleType }) => {

        // ✅ Validate only required fields from body
        if (!pickup || !destination || !vehicleType) {
            throw new Error('Pickup, destination, and vehicle type are required');
        }

        // ✅ Validate user separately
        if (!user) {
            throw new Error('User not authenticated');
        }

        const fare = await RideService.getFare(pickup, destination);

        // ✅ Validate vehicle type
        if (!fare[vehicleType]) {
            throw new Error("Invalid vehicle type");
        }

        const ride = await rideModel.create({
            user,
            pickup,
            destination,
            otp: RideService.getOtp(4), // Generate 4-digit OTP
            fare: fare[vehicleType]
        });

        return ride;
    },

    getOtp: (num) => {
        // Generate cryptographically secure OTP with exactly 'num' digits
        const min = Math.pow(10, num - 1);
        const max = Math.pow(10, num) - 1;
        const otp = crypto.randomInt(min, max + 1);
        
        console.log(`Generated OTP for ${num}: ${otp}`);
        return otp;
    },


    getFare: async (origin, destination) => {
        if (!origin || !destination) {
            throw new Error('Pickup and destination are required');
        }

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        const distanceInKm = distanceTime.distance / 1000;
        const durationInMinutes = distanceTime.duration / 60;

        const fareConfig = {
            bike: { baseFare: 20, perKmRate: 8, perMinuteRate: 1, minimumFare: 30 },
            nonAcCar: { baseFare: 50, perKmRate: 18, perMinuteRate: 3, minimumFare: 100 },
            acCar: { baseFare: 80, perKmRate: 22, perMinuteRate: 4, minimumFare: 150 },
            shuttle: { baseFare: 40, perKmRate: 10, perMinuteRate: 1.5, minimumFare: 60 }
        };

        const calculateFare = (config) => {
            const distanceFare = distanceInKm * config.perKmRate;
            const timeFare = durationInMinutes * config.perMinuteRate;
            const totalFare = config.baseFare + distanceFare + timeFare;
            return Math.max(Math.round(totalFare), config.minimumFare);
        };

        return {
            bike: calculateFare(fareConfig.bike),
            nonAcCar: calculateFare(fareConfig.nonAcCar),
            acCar: calculateFare(fareConfig.acCar),
            shuttle: calculateFare(fareConfig.shuttle),
            distance: distanceInKm.toFixed(2),
            duration: Math.round(durationInMinutes)
        };
    }
};

export default RideService;