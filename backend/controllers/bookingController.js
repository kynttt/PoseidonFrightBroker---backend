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
      // .populate('truck')
      .populate('createdBy')
      // .populate('carrier');
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
      // .populate('truck')
      .populate('createdBy')
      // .populate('carrier')
      .populate('status');
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
      // .populate('truck')
      .populate('createdBy')
      // .populate('carrier');
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

// Get bookings for a specific user
exports.getBookingsByUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user info is in req.user

    const bookings = await Booking.find({ createdBy: userId })
      .populate('quote') // Populate the 'quote' field with the actual 'Quote' document
      .populate('createdBy') // Populate the 'createdBy' field with the actual 'User' document
      .exec();

    // Log the bookings to see what is being fetched
    console.log('Fetched bookings:', bookings);

    // Ensure the response includes the status field
    res.json(bookings.map(booking => ({
      ...booking.toObject(),
      status: booking.status // Assuming status is a field in your Booking model
    })));
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getBookingByQuoteId = async (req, res, next) => {
  try {
    const { quoteId } = req.params;

    // Query the Booking collection to find the booking associated with the quoteId
    const booking = await Booking.findOne({ quote: quoteId });

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found for this quote' });
    }

    res.json({ status: booking.status }); // Sending back the status field of the booking
  } catch (error) {
    console.error('Error fetching booking status:', error);
    res.status(500).json({ error: 'Server error' });
  }
};