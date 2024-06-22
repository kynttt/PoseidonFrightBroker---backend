const mongoose = require('mongoose');

const FreightQuoteSchema = new mongoose.Schema({
  shipper: { type: mongoose.Schema.Types.ObjectId, ref: 'Shipper', required: false },
  origin: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  cargoDetails: { type: String, required: false },
  weight: { type: Number, required: true },
  volume: { type: Number, required: false },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: false },
  truckType: { 
    type: String, 
    enum: ['Dry Van', 'Reefer', 'Flat Bed', 'Step Deck', 'FTL', 'LTL'],
    required: true 
  }, // Type of truck associated with the freight quote
  status: { type: String, default: 'Pending' }, // "pending", "confirmed", "cancelled"
  shipmentDate: { type: Date, required: true }, // New field for shipment date
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FreightQuote', FreightQuoteSchema);
