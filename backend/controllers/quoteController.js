const Quote = require('../models/Quote');

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Admin only
const getQuotes = async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.status(200).json(quotes);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching quotes', error: err.message });
    }
};

// @desc    Get a quote by ID
// @route   GET /api/quotes/:id
// @access  Admin only
const getQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
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
    const { origin, destination, pickupDate, trailerType, trailerSize, commodity, maxWeight, companyName, distance, price } = req.body;

    try {
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
        });

        const savedQuote = await newQuote.save();
        res.status(201).json(savedQuote);
    } catch (err) {
        res.status(500).json({ message: 'Error creating quote', error: err.message });
    }
};

// @desc    Update a quote by ID
// @route   PUT /api/quotes/:id
// @access  Admin only
const updateQuote = async (req, res) => {
    const { id } = req.params;
    const { origin, destination, pickupDate, trailerType, trailerSize, commodity, maxWeight, companyName, distance, price } = req.body;

    try {
        const updatedQuote = await Quote.findByIdAndUpdate(
            id,
            {
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
            },
            { new: true }
        );

        if (!updatedQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        res.status(200).json(updatedQuote);
    } catch (err) {
        res.status(500).json({ message: 'Error updating quote', error: err.message });
    }
};

// @desc    Delete a quote by ID
// @route   DELETE /api/quotes/:id
// @access  Admin only
const deleteQuote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedQuote = await Quote.findByIdAndDelete(id);

        if (!deletedQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

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
};
