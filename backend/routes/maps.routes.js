import express from 'express';
const router = express.Router();
import { authUser } from '../middlewares/auth.middileware.js';
import { mapController } from '../controllers/maps.controller.js';
import { query } from 'express-validator';

router.get('/get-coordinates', [
    query('address').not().isEmpty().withMessage('Address is required')
], authUser, mapController.getCoordinates);

router.get('/get-distance-time', [
    query('origin').not().isEmpty().withMessage('Origin is required'),
    query('destination').not().isEmpty().withMessage('Destination is required')
], authUser, mapController.getDistanceTime);

router.get('/get-suggestions', [
    query('input').not().isEmpty().withMessage('Input is required')
], mapController.getSuggestions);

export default router;