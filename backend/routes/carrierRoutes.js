const express = require('express');
const router = express.Router();
const carrierController = require('../controllers/carrierController');
const { authenticateJWT, authorizeRole } = require('../middlewares');

// Routes requiring authentication and authorization can be added here
router.get('/carriers', authenticateJWT, authorizeRole('admin'), carrierController.getAllCarriers);
router.get('/:id', authenticateJWT, authorizeRole('admin'), carrierController.getCarrierById);
router.post('/', authenticateJWT, authorizeRole('admin'), carrierController.createCarrier);
router.put('/:id', authenticateJWT, authorizeRole('admin'), carrierController.updateCarrier);
router.delete('/:id', authenticateJWT, authorizeRole('admin'), carrierController.deleteCarrier);

module.exports = router;
