const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const {
    user,
    truck,
    pickupAddress,
    deliveryAddress,
    bookingDate,
    pickupDate,
    deliveryDate,
    distance,
    status,
  } = req.body;

  try {
    const booking = new Booking({
      user,
      truck,
      pickupAddress,
      deliveryAddress,
      bookingDate,
      pickupDate,
      deliveryDate,
      distance,
      status,
    });
    await booking.save();
    res.json(booking);
  } catch (err) {
    console.error(err.message); // Log the error message for debugging

    // Check if the error is a validation error (e.g., required fields missing)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }

    res.status(500).send('Server error');
  }
};
