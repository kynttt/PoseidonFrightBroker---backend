// controllers/paymentController.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51NXxg6H2RwRqgszaxq7xUZ1Sk6eILiBCAA4owOY9uN50LR3k5FRgNljz9D277uhMn7AuyJoizHcJ8KsTdxkdL9rB00xH7rejz1');
const Payment = require('../models/Payment');

let payments = []; // In-memory storage for payments

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    const payment = new Payment(amount);
    payment.status = 'created';
    payments.push(payment);

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
