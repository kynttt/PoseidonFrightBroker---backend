const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// POST /api/trucks
router.post('/addTruck', truckController.addTruck);

module.exports = router;
