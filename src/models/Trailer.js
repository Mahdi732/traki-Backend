import mongoose from 'mongoose';

const TrailerSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    vin: {
        type: String,
        unique: true,
        sparse: true
    },
    make: {
        type: String
    },
    model: {
        type: String
    },
    year: {
        type: Number
    },
    capacity: {
        type: Number
    },
    status: {
        type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE'
    }
}, {
    timestamps: true
});

export default mongoose.model('Trailer', TrailerSchema);
