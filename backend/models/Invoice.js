const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  quote: { type: mongoose.Schema.Types.ObjectId, ref: 'Quote', required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  dateIssued: { type: Date, required: true, default: Date.now },
  dueDate: { type: Date, required: true },
  amountDue: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Unpaid', 'Paid', 'Overdue'], 
    default: 'Unpaid' 
  },
  booking: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

InvoiceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
