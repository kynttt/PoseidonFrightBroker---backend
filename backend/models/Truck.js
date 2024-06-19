const mongoose = require('mongoose');
const TruckSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true, unique: true },
  model: { type: String, required: true },
  capacity: { type: Number, required: true },
  status: { type: String, default: 'Available' },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Truck', TruckSchema);
