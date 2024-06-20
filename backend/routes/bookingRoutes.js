const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticateJWT, authorizeRole, errorHandler } = require('../middlewares');

router.post('/book', authenticateJWT, bookingController.createBooking);
router.get('/bookings', authenticateJWT, bookingController.getBookings);
router.get('/:id', authenticateJWT, bookingController.getBooking);
router.put('/:id', authenticateJWT, bookingController.updateBooking);
router.delete('/:id', authenticateJWT, authorizeRole('admin'), bookingController.deleteBooking);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
