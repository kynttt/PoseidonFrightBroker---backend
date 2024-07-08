const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  quoteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true, enum: ['Credit Card', 'PayPal'] },
  status: { type: String, required: true, enum: ['Paid', 'Pending'] },
});

module.exports = mongoose.model('Payment', PaymentSchema);
