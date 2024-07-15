const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, default: 'Available' },
  type: { type: String, required: true, enum: ['Dry Van', 'Reefer', 'Flat Bed', 'Step Deck', 'FTL', 'LTL'] },
  size: { type: Number, required: true, enum: [28, 32, 36, 40, 42, 43, 48, 53] },
  rate: { type: Number, required: true },
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Truck', TruckSchema);
