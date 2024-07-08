const Quote = require('../models/Quote');

exports.createQuote = async (req, res) => {
  const { userId, pickUpLocation, deliveryLocation, pickUpState, deliveryState, pickUpDate, trailerType, trailerSize, commodity, weight, companyName, price } = req.body;

  try {
    const quote = new Quote({
      userId,
      pickUpLocation,
      deliveryLocation,
      pickUpState,
      deliveryState,
      pickUpDate,
      trailerType,
      trailerSize,
      commodity,
      weight,
      companyName,
      price,
    });

    await quote.save();
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().populate('userId');
    res.json(quotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getQuote = async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id).populate('userId');
    if (!quote) {
      return res.status(404).json({ msg: 'Quote not found' });
    }
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateQuote = async (req, res) => {
  const { pickUpLocation, deliveryLocation, pickUpState, deliveryState, pickUpDate, trailerType, trailerSize, commodity, weight, companyName, price } = req.body;

  const quoteFields = { pickUpLocation, deliveryLocation, pickUpState, deliveryState, pickUpDate, trailerType, trailerSize, commodity, weight, companyName, price };

  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ msg: 'Quote not found' });
    }

    quote = await Quote.findByIdAndUpdate(req.params.id, { $set: quoteFields }, { new: true });
    res.json(quote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteQuote = async (req, res) => {
  try {
    let quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ msg: 'Quote not found' });
    }

    await Quote.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Quote removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
