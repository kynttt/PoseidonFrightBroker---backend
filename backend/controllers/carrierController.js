const Carrier = require('../models/Carrier');

exports.createCarrier = async (req, res) => {
  const { name, contact, address } = req.body;

  try {
    const carrier = new Carrier({ name, contact, address });
    await carrier.save();
    res.json(carrier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCarriers = async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);
    if (!carrier) {
      return res.status(404).json({ msg: 'Carrier not found' });
    }
    res.json(carrier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.updateCarrier = async (req, res) => {
  const { name, contact, address } = req.body;

  const carrierFields = { name, contact, address };

  try {
    let carrier = await Carrier.findById(req.params.id);
    if (!carrier) {
      return res.status(404).json({ msg: 'Carrier not found' });
    }

    carrier = await Carrier.findByIdAndUpdate(req.params.id, { $set: carrierFields }, { new: true });
    res.json(carrier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteCarrier = async (req, res) => {
  try {
    let carrier = await Carrier.findById(req.params.id);
    if (!carrier) {
      return res.status(404).json({ msg: 'Carrier not found' });
    }

    await Carrier.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Carrier removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
