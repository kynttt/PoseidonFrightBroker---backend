const Carrier = require('../models/Carrier');

// Get all carriers
exports.getAllCarriers = async (req, res) => {
  try {
    const carriers = await Carrier.find();
    res.json(carriers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get carrier by ID
exports.getCarrierById = async (req, res) => {
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

// Create a new carrier
exports.createCarrier = async (req, res) => {
  const { companyName, contactNumber, address } = req.body;

  try {
    const newCarrier = new Carrier({
      companyName,
      contactNumber,
      address
    });

    await newCarrier.save();
    res.json(newCarrier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing carrier
exports.updateCarrier = async (req, res) => {
  const { companyName, contactNumber, address } = req.body;

  try {
    let updatedCarrier = await Carrier.findById(req.params.id);

    if (!updatedCarrier) {
      return res.status(404).json({ msg: 'Carrier not found' });
    }

    updatedCarrier.companyName = companyName;
    updatedCarrier.contactNumber = contactNumber;
    updatedCarrier.address = address;

    await updatedCarrier.save();
    res.json(updatedCarrier);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a carrier
exports.deleteCarrier = async (req, res) => {
  try {
    const carrier = await Carrier.findById(req.params.id);

    if (!carrier) {
      return res.status(404).json({ msg: 'Carrier not found' });
    }

    await carrier.deleteOne();
    res.json({ msg: 'Carrier removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
