import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    socketId: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['available', 'unavailable', 'on-duty'],
        default: 'available',
    },    
    vehicle: {
        color: {
            type: String,
            required: true,
        },
        licensePlate: {
            type: String,
            required: true,
            unique: true,
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            enum: ['car A/C', 'bike', 'car non-A/C', 'shuttle'],
            required: true,
        },
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    age: {  
        type: Number,
        required: true,
    },  
    experience: {
        type: Number,
        required: true,
    },
});
captainSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};
captainSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

captainSchema.methods.hashPassword = async function(plainPassword) {
    const saltRounds = 10;
    return await bcrypt.hash(plainPassword, saltRounds);
};

    // Here you would typically use a library like jsonwebtoken to generate a token
    // For example:
    // return jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

const Captain = mongoose.model('Captain', captainSchema);

export default Captain;