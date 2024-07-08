const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');
const { authenticateJWT, authorizeRole, errorHandler } = require('../middlewares');

// All truck routes require authentication
router.post('/', authenticateJWT, authorizeRole(true), truckController.createTruck);
router.get('/', authenticateJWT, authorizeRole(true), truckController.getTrucks);
router.get('/:id', authenticateJWT, authorizeRole(true), truckController.getTruck);
router.put('/:id', authenticateJWT, authorizeRole(true), truckController.updateTruck);
router.delete('/:id', authenticateJWT, authorizeRole(true), truckController.deleteTruck);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
