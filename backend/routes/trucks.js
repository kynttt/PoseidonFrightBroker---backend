const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const { authenticateJWT, authorizeRole, errorHandler } = require('../middlewares');

router.post('/addTruck', authenticateJWT, authorizeRole('admin'), truckController.addTruck);
router.get('/trucks', authenticateJWT, truckController.getTrucks);
router.get('/:id', authenticateJWT, truckController.getTruck);
router.put('/:id', authenticateJWT, authorizeRole('admin'), truckController.updateTruck);
router.delete('/:id', authenticateJWT, authorizeRole('admin'), truckController.deleteTruck);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
