const express = require('express');
const router = express.Router();
const freightQuoteController = require('../controllers/freightQuoteController');
const { authenticateJWT } = require('../middlewares');

// Routes requiring authentication
router.get('/freightquotes', authenticateJWT, freightQuoteController.getAllFreightQuotes);
router.get('/:id', authenticateJWT, freightQuoteController.getFreightQuoteById);
router.post('/addFreightquotes', authenticateJWT, freightQuoteController.createFreightQuote);
router.put('/:id', authenticateJWT, freightQuoteController.updateFreightQuote);
router.delete('/:id', authenticateJWT, freightQuoteController.deleteFreightQuote);

module.exports = router;
