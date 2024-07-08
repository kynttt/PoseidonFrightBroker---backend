// routes/quoteRoutes.js

const express = require('express');
const router = express.Router();
const quoteController = require('../controllers/quoteController');
const { authenticateJWT, authorizeRoles, errorHandler } = require('../middlewares');

// Middleware to authenticate all routes below
router.use(authenticateJWT);

// @route   GET /api/quotes
// @desc    Get all quotes
// @access  Admin only
router.get('/', authorizeRoles('admin'), quoteController.getQuotes);

// @route   GET /api/quotes/:id
// @desc    Get a quote by ID
// @access  Admin only
router.get('/:id', authorizeRoles('admin'), quoteController.getQuote);

// @route   POST /api/quotes
// @desc    Create a new quote
// @access  Public (for now, adjust as needed)
router.post('/', quoteController.createQuote);

// @route   PUT /api/quotes/:id
// @desc    Update a quote by ID
// @access  Admin only
router.put('/:id', authorizeRoles('admin'), quoteController.updateQuote);

// @route   DELETE /api/quotes/:id
// @desc    Delete a quote by ID
// @access  Admin only
router.delete('/:id', authorizeRoles('admin'), quoteController.deleteQuote);

// Error handling middleware
router.use(errorHandler);

module.exports = router;
