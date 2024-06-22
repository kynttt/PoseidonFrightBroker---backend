const Shipment = require('../models/Shipment');

// Get all shipments
exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get shipment by ID
exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new shipment
exports.createShipment = async (req, res) => {
  const { shipper, carrier, truck, origin, destination, cargoDetails, weight, volume, pickupDate, deliveryDate, status, freightQuote } = req.body;

  try {
    const newShipment = new Shipment({
      shipper,
      carrier,
      truck,
      origin,
      destination,
      cargoDetails,
      weight,
      volume,
      pickupDate,
      deliveryDate,
      status,
      freightQuote
    });

    await newShipment.save();
    res.json(newShipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing shipment
exports.updateShipment = async (req, res) => {
  const { shipper, carrier, truck, origin, destination, cargoDetails, weight, volume, pickupDate, deliveryDate, status, freightQuote } = req.body;

  try {
    let updatedShipment = await Shipment.findById(req.params.id);

    if (!updatedShipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }

    updatedShipment.shipper = shipper;
    updatedShipment.carrier = carrier;
    updatedShipment.truck = truck;
    updatedShipment.origin = origin;
    updatedShipment.destination = destination;
    updatedShipment.cargoDetails = cargoDetails;
    updatedShipment.weight = weight;
    updatedShipment.volume = volume;
    updatedShipment.pickupDate = pickupDate;
    updatedShipment.deliveryDate = deliveryDate;
    updatedShipment.status = status;
    updatedShipment.freightQuote = freightQuote;

    await updatedShipment.save();
    res.json(updatedShipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a shipment
exports.deleteShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);

    if (!shipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }

    await shipment.deleteOne();
    res.json({ msg: 'Shipment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
