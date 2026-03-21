import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fare: {
        type: Number
    },
    distance: {
        type: Number
    },      //in meters
    duration: {
        type: Number
    },      //in seconds
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Captain'
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'in-progress', 'completed', 'cancelled'],
        default: 'requested'
    },
    paymentId: {
        type: String
    },
    orderBy: {
        type: String
    },
    signature: {
        type: String
    },
    otp: {
        type: Number,
        select: false,
        required: true
    }

});

export default mongoose.model('ride', rideSchema);