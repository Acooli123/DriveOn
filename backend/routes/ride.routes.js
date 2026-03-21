import express from 'express';
const router = express.Router();
import { body, query } from 'express-validator';
import { rideController } from '../controllers/ride.controller.js';
import { authUser } from '../middlewares/auth.middileware.js';

// Get fare for different vehicle types
router.get('/get-fare', [
    authUser,
    query('pickup').isString().isLength({ min: 2 }).withMessage('Pickup is required'),
    query('destination').isString().isLength({ min: 2 }).withMessage('Destination is required')
], rideController.getFare);

router.post('/create', 
    authUser,
    [
        body('pickup').isString().isLength({ min: 2, max: 100 }).withMessage('Pickup must be between 2 and 100 characters'),
        body('destination').isString().isLength({ min: 2, max: 100 }).withMessage('Destination must be between 2 and 100 characters'),
        body('vehicleType').isString().isIn(['bike', 'nonAcCar', 'acCar', 'shuttle']).withMessage('Invalid vehicle type')
    ], 
    rideController.createRide
);

export default router;