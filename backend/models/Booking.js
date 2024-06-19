const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  truck: { type: mongoose.Schema.Types.ObjectId, ref: 'Truck', required: true },
  pickupAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  deliveryAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
  bookingDate: { type: Date, required: true },
  pickupDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
  distance: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);
