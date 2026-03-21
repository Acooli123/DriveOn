import RideService from '../services/ride.service.js';
import { validationResult } from 'express-validator';

export const rideController = {

    getFare: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination } = req.query;

        try {
            const fares = await RideService.getFare(pickup, destination);
            return res.status(200).json(fares);
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to calculate fare',
                error: error.message
            });
        }
    },

    createRide: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination, vehicleType } = req.body;

        try {
            // ✅ Ensure user is authenticated
            if (!req.user || !req.user._id) {
                return res.status(401).json({ message: "User not authenticated" });
            }

            const ride = await RideService.createRide({
                user: req.user._id,   // ✅ from JWT
                pickup,
                destination,
                vehicleType
            });

            return res.status(201).json(ride);

        } catch (error) {
            return res.status(500).json({
                message: 'Failed to create ride',
                error: error.message
            });
        }
    },

};