const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { user, truck, pickupAddress, deliveryAddress, distance } = req.body;
  try {
    const booking = new Booking({ user, truck, pickupAddress, deliveryAddress, distance });
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).send('Server error');
  }
};
