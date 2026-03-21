import { mapService } from '../services/maps.service.js';
import { validationResult } from 'express-validator';

export const mapController = {
    getCoordinates: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { address } = req.query;

        if (!address) {
            return res.status(400).json({ message: 'Address query parameter is required' });
        }

        try {
            const coordinates = await mapService.getAddressCoordinate(address);
            res.status(200).json(coordinates);
        } catch (error) {
            res.status(500).json({
                message: 'Co-ordinates not found',
                error: error.message
            });
        }
    },

    getDistanceTime: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        try {
            const distanceTime = await mapService.getDistanceTime(origin, destination);
            res.status(200).json(distanceTime);
        } catch (error) {
            res.status(500).json({
                message: 'Distance and time not found',
                error: error.message
            });
        }
    },

    getSuggestions: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { input } = req.query;
        
        try {
            const suggestions = await mapService.getSuggestions(input);
            res.status(200).json(suggestions);
        } catch (error) {
            res.status(500).json({
                message: 'Suggestions not found',
                error: error.message
            });
        }
    }
};