const express = require('express');
const router = express.Router();
const shipperController = require('../controllers/shipperController');
const { authenticateJWT } = require('../middlewares');

// Routes requiring authentication
router.get('/shippers', authenticateJWT, shipperController.getAllShippers);
router.get('/:id', authenticateJWT, shipperController.getShipperById);
router.post('/', authenticateJWT, shipperController.createShipper);
router.put('/:id', authenticateJWT, shipperController.updateShipper);
router.delete('/:id', authenticateJWT, shipperController.deleteShipper);

module.exports = router;
