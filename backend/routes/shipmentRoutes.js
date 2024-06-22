const express = require('express');
const router = express.Router();
const shipmentController = require('../controllers/shipmentController');
const { authenticateJWT } = require('../middlewares');

// Routes requiring authentication
router.get('/shipments', authenticateJWT, shipmentController.getAllShipments);
router.get('/:id', authenticateJWT, shipmentController.getShipmentById);
router.post('/', authenticateJWT, shipmentController.createShipment);
router.put('/:id', authenticateJWT, shipmentController.updateShipment);
router.delete('/:id', authenticateJWT, shipmentController.deleteShipment);

module.exports = router;
