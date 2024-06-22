const FreightQuote = require('../models/FreightQuote');
const Truck = require('../models/Truck');

// Function to calculate freight quote price
const calculateFreightQuotePrice = (distance, truckType, weight) => {
  // Your business logic for calculating price based on distance, truck type, and weight
  // Example logic (you should adjust this based on your specific requirements)
  let baseRatePerMile = 1.5; // Adjust this rate according to your business rules
  let truckTypeFactor = 1.0; // Adjust based on the truck type
  let weightFactor = 1.0; // Adjust based on the weight

  // Calculate total price
  let totalPrice = distance * baseRatePerMile * truckTypeFactor * weightFactor;

  // Example: If the price needs to be formatted or adjusted further
  // totalPrice = totalPrice.toFixed(2); // Uncomment if you want to round to 2 decimal places

  return totalPrice;
};

// Get all freight quotes
exports.getAllFreightQuotes = async (req, res) => {
  try {
    const freightQuotes = await FreightQuote.find();
    res.json(freightQuotes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get freight quote by ID
exports.getFreightQuoteById = async (req, res) => {
  try {
    const freightQuote = await FreightQuote.findById(req.params.id);
    if (!freightQuote) {
      return res.status(404).json({ msg: 'Freight Quote not found' });
    }
    res.json(freightQuote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new freight quote
exports.createFreightQuote = async (req, res) => {
  const { shipper, origin, destination, truckType, weight, distance, shipmentDate } = req.body;

  try {
    // Calculate the price based on distance, truck type, and weight
    const price = calculateFreightQuotePrice(distance, truckType, weight);

    // Create new FreightQuote object
    const newFreightQuote = new FreightQuote({
      shipper,
      origin,
      destination,
      truckType,
      weight,
      distance,
      shipmentDate,
      price,
      status: 'Pending'
    });

    await newFreightQuote.save();
    res.json(newFreightQuote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Update an existing freight quote
exports.updateFreightQuote = async (req, res) => {
  const { origin, destination, truckType, weight, distance, shipmentDate } = req.body;

  try {
    let updatedFreightQuote = await FreightQuote.findById(req.params.id);

    if (!updatedFreightQuote) {
      return res.status(404).json({ msg: 'Freight Quote not found' });
    }

    // Recalculate the price based on updated information
    const price = calculateFreightQuotePrice(distance, truckType, weight);

    updatedFreightQuote.origin = origin;
    updatedFreightQuote.destination = destination;
    updatedFreightQuote.truckType = truckType;
    updatedFreightQuote.weight = weight;
    updatedFreightQuote.distance = distance;
    updatedFreightQuote.shipmentDate = shipmentDate; // Update shipment date
    updatedFreightQuote.price = price;

    await updatedFreightQuote.save();
    res.json(updatedFreightQuote);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Delete a freight quote
exports.deleteFreightQuote = async (req, res) => {
  try {
    const freightQuote = await FreightQuote.findById(req.params.id);

    if (!freightQuote) {
      return res.status(404).json({ msg: 'Freight Quote not found' });
    }

    await freightQuote.deleteOne();
    res.json({ msg: 'Freight Quote removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
