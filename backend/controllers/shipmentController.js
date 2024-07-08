const Shipment = require('../models/Shipment');

exports.createShipment = async (req, res) => {
  const { quoteId, status, trackingNumber } = req.body;

  try {
    const shipment = new Shipment({ quoteId, status, trackingNumber });
    await shipment.save();
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('quoteId');
    res.json(shipments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getShipment = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('quoteId');
    if (!shipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateShipment = async (req, res) => {
  const { status, trackingNumber } = req.body;

  const shipmentFields = { status, trackingNumber };

  try {
    let shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }

    shipment = await Shipment.findByIdAndUpdate(req.params.id, { $set: shipmentFields }, { new: true });
    res.json(shipment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteShipment = async (req, res) => {
  try {
    let shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ msg: 'Shipment not found' });
    }

    await Shipment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Shipment removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
