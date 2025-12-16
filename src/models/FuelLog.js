import mongoose from 'mongoose';

const FuelLogSchema = new mongoose.Schema({
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  volume: { type: Number, required: true },
  km: { type: Number },
  notes: { type: String }
}, { timestamps: true });

export default mongoose.model('FuelLog', FuelLogSchema);
