const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateJWT, errorHandler } = require('../middlewares');

router.use(authenticateJWT); // Middleware to authenticate all routes below

router.post('/', bookingController.createBooking); // Users can create a booking
router.get('/', bookingController.getBookings); // Users can view all bookings
router.get('/user', bookingController.getBookingsByUser); // Users can view all bookings
router.get('/:id', bookingController.getBooking); // Users can view a single booking
router.put('/:id', bookingController.updateBooking); // Users can update a booking
router.delete('/:id', bookingController.deleteBooking); // Users can delete a booking

router.get('/:quoteId', bookingController.getBookingByQuoteId); // Fetch booking status by quoteId

// Error handling middleware
router.use(errorHandler);

module.exports = router;
