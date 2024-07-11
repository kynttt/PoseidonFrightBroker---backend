const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  pickupDate: { type: Date, required: true },
  trailerType: { type: String, required: true },
  trailerSize: { type: Number, required: true },
  commodity: { type: String, required: true },
  maxWeight: { type: Number, required: true },
  companyName: { type: String, required: true },
  distance: { type: String, required: true },
  price: { type: Number, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', QuoteSchema);
