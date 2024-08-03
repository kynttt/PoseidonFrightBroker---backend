// models/Payment.js
class Payment {
    constructor(amount) {
      this.amount = amount;
      this.createdAt = new Date();
      this.status = 'pending';
    }
  }
  
  module.exports = Payment;
  