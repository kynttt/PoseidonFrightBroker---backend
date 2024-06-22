const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const { authenticateJWT, authorizeRole } = require('../middlewares');

// Routes requiring authentication and authorization can be added here
router.get('/address', authenticateJWT, addressController.getAllAddresses);
router.get('/:id', authenticateJWT, addressController.getAddressById);
router.post('/', authenticateJWT, addressController.createAddress);
router.put('/:id', authenticateJWT, addressController.updateAddress);
router.delete('/:id', authenticateJWT, addressController.deleteAddress);

module.exports = router;
