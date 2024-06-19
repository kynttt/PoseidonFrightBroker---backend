const express = require('express');
const router = express.Router();
const truckController = require('../controllers/truckController');

// POST /api/trucks
router.post('/addTruck', truckController.addTruck);

router.get('/trucks', truckController.getTrucks);
router.get('/:id', truckController.getTruck);
router.put('/:id', truckController.updateTruck);
router.delete('/:id', truckController.deleteTruck);

module.exports = router;
