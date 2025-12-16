import mongoose from 'mongoose';

const TireSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true, unique: true, index: true },
  position: { type: String },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck' },
  installedAtKm: { type: Number },
  status: { type: String, enum: ['GOOD', 'WORN', 'REPLACED'], default: 'GOOD' }
}, { timestamps: true });

export default mongoose.model('Tire', TireSchema);
