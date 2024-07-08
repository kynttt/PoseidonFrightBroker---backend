const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  postalCode: { type: String, required: true },
  companyName: { type: String, default: '' },
  role: { 
    type: String, 
    enum: ['admin', 'dispatcher', 'accountant', 'lawyer', 'management', 'user'],
    default: 'user' // Default role can be set to one of the roles
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
