const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'In Transit', 'Delivered', 'Cancelled'], default: 'Pending' },
  // truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // carrier: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrier', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
