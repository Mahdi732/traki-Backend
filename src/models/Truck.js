import mongoose from 'mongoose';

const TruckSchema = new mongoose.Schema({
  plateNumber: { type: String, required: true, unique: true, index: true },
  vin: { type: String, required: false, unique: true, sparse: true },
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  capacity: { type: Number },
  status: { type: String, enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'], default: 'ACTIVE' }
}, { timestamps: true });

export default mongoose.model('Truck', TruckSchema);
