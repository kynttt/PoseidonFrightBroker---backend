const Quote = require('../models/Quote');
const { validationResult } = require('express-validator');


// @desc    Delete all quotes
// @route   DELETE /api/quotes/deleteAll
// @access  Admin only
const deleteAllQuotes = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden' });
    }

    try {
        await Quote.deleteMany();
        res.status(200).json({ message: 'All quotes deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting all quotes', error: err.message });
    }
};

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Admin only (or user's own quotes)
const getQuotes = async (req, res) => {
    try {
        let quotes;
        if (req.user.role === 'admin') {
            quotes = await Quote.find().populate('createdBy', 'name email');
        } else {
            quotes = await Quote.find({ createdBy: req.user._id }).populate('createdBy', 'name email');
        }
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err.message });
    }
};

// @desc    Get a quote by ID
// @route   GET /api/quotes/:id
// @access  Admin only (or user's own quote)
const getQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await Quote.findById(id).populate('createdBy', 'name email');
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        if (req.user.role !== 'admin' && quote.createdBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access forbidden' });
        }
        res.status(200).json(quote);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quote', error: err.message });
    }
};

// @desc    Create a new quote
// @route   POST /api/quotes
// @access  Public (for now, adjust as needed)
const createQuote = async (req, res) => {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    // Destructure required fields from request body
    const {
      origin,
      destination,
      pickupDate,
      trailerType,
      trailerSize,
      commodity,
      maxWeight,
      companyName,
      distance,
      price,
    } = req.body;
  
    try {
      // Create new quote object
      const newQuote = new Quote({
        origin,
        destination,
        pickupDate,
        trailerType,
        trailerSize,
        commodity,
        maxWeight,
        companyName,
        distance,
        price,
        createdBy: req.user.id, // Set createdBy field to authenticated user's ID
      });
  
      // Save quote to database
      const savedQuote = await newQuote.save();
  
      // Return success response
      res.status(201).json(savedQuote);
    } catch (error) {
      console.error('Error creating quote:', error.message);
      res.status(500).json({ message: 'Error creating quote', error: error.message });
    }
  };


// @desc    Update a quote by ID
// @route   PUT /api/quotes/:id
// @access  Admin only (or user's own quote)
const updateQuote = async (req, res) => {
    const { id } = req.params;
    const { origin, destination, pickupDate, trailerType, trailerSize, commodity, maxWeight, companyName, distance, price } = req.body;

    try {
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        if (req.user.role !== 'admin' && quote.createdBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access forbidden' });
        }

        quote.origin = origin;
        quote.destination = destination;
        quote.pickupDate = pickupDate;
        quote.trailerType = trailerType;
        quote.trailerSize = trailerSize;
        quote.commodity = commodity;
        quote.maxWeight = maxWeight;
        quote.companyName = companyName;
        quote.distance = distance;
        quote.price = price;
        quote.updatedAt = Date.now();

        const updatedQuote = await quote.save();
        res.status(200).json(updatedQuote);
    } catch (err) {
        res.status(500).json({ message: 'Error updating quote', error: err.message });
    }
};

// @desc    Delete a quote by ID
// @route   DELETE /api/quotes/:id
// @access  Admin only (or user's own quote)
const deleteQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        if (req.user.role !== 'admin' && quote.createdBy._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Access forbidden' });
        }

        await Quote.findByIdAndDelete(id);
        res.status(200).json({ message: 'Quote deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting quote', error: err.message });
    }
};





module.exports = {
    getQuotes,
    getQuote,
    createQuote,
    updateQuote,
    deleteQuote,
    deleteAllQuotes,
};
