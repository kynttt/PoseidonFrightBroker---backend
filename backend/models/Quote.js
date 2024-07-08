const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pickUpLocation: { type: String, required: true },
  deliveryLocation: { type: String, required: true },
  pickUpState: { type: String, required: true },
  deliveryState: { type: String, required: true },
  pickUpDate: { type: Date, required: true },
  trailerType: { type: String, required: true },
  trailerSize: { type: String, required: true },
  commodity: { type: String, required: true },
  weight: { type: Number, required: true },
  companyName: { type: String, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quote', QuoteSchema);
