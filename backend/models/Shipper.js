const mongoose = require('mongoose');

const ShipperSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  companyName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipper', ShipperSchema);
