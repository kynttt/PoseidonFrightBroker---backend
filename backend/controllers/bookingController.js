const Booking = require('../models/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  const { quote, status, truck, carrier } = req.body;
  const createdBy = req.user.id; // Assuming user info is in req.user

  try {
    const newBooking = new Booking({
      quote,
      status,
      truck,
      carrier,
      createdBy,
    });

    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('quote')
      .populate('truck')
      .populate('createdBy')
      .populate('carrier');
    res.json(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a single booking
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('quote')
      .populate('truck')
      .populate('createdBy')
      .populate('carrier');
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a booking
exports.updateBooking = async (req, res) => {
  const { status, truck, carrier } = req.body;

  const bookingFields = { status, truck, carrier };

  try {
    let booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, { $set: bookingFields }, { new: true })
      .populate('quote')
      .populate('truck')
      .populate('createdBy')
      .populate('carrier');
    res.json(booking);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Booking removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
