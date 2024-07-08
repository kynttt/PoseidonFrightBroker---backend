const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  quoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  status: { type: String, required: true, enum: ['Pending', 'In Transit', 'Delivered'] },
  trackingNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
