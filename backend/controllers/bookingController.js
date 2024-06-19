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

// Get Bookings
exports.getBookings = async (req, res) => {
    try {
      const bookings = await Booking.find().populate('user truck', 'name licensePlate');
      res.json(bookings);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  


// Get Specific Booking
  exports.getBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id).populate('user truck', 'name licensePlate');
      if (!booking) {
        return res.status(404).json({ msg: 'Booking not found' });
      }
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// Get Update Booking
  exports.updateBooking = async (req, res) => {
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
  
    const bookingFields = {
      user,
      truck,
      pickupAddress,
      deliveryAddress,
      bookingDate,
      pickupDate,
      deliveryDate,
      distance,
      status,
    };
  
    try {
      let booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ msg: 'Booking not found' });
      }
  
      booking = await Booking.findByIdAndUpdate(req.params.id, { $set: bookingFields }, { new: true });
      res.json(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

// Get Delete Booking
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