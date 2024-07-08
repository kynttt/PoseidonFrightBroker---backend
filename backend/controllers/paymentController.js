const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { quoteId, userId, amount, paymentMethod, status } = req.body;

  try {
    const payment = new Payment({ quoteId, userId, amount, paymentMethod, status });
    await payment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('quoteId').populate('userId');
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('quoteId').populate('userId');
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updatePayment = async (req, res) => {
  const { amount, paymentMethod, status } = req.body;

  const paymentFields = { amount, paymentMethod, status };

  try {
    let payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    payment = await Payment.findByIdAndUpdate(req.params.id, { $set: paymentFields }, { new: true });
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deletePayment = async (req, res) => {
  try {
    let payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }

    await Payment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Payment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
