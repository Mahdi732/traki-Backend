import mongoose from 'mongoose';

const TripSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Truck'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    origin: {
        type: String
    },
    destination: {
        type: String
    },
    plannedStart: {
        type: Date
    },
    plannedEnd: {
        type: Date
    },
    status: {
        type: String, enum: ['TO_DO', 'IN_PROGRESS', 'DONE'],
        default: 'TO_DO'
    },
    startKm: {
        type: Number
    },
    endKm: {
        type: Number
    },
    fuelVolume: {
        type: Number
    },
    remarks: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('Trip', TripSchema);
