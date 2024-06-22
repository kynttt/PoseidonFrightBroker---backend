const mongoose = require('mongoose');

const ShipmentSchema = new mongoose.Schema({
  shipper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper', required: true }, // Foreign key to Shipper
  carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true }, // Foreign key to Carrier
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true }, // Foreign key to Truck
  origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }, // Foreign key to Address
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true }, // Foreign key to Address
  cargoDetails: { type: String, required: true },
  weight: { type: Number, required: true },
  volume: { type: Number, required: true },
  pickupDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' }, // "pending", "in transit", "delivered", "cancelled"
  freightQuote: { type: mongoose.Schema.Types.ObjectId, ref: 'FreightQuote' }, // Optional foreign key to FreightQuote
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Shipment', ShipmentSchema);
