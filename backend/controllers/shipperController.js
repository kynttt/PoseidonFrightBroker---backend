const Shipper = require('../models/Shipper');

// Get all shippers
exports.getAllShippers = async (req, res) => {
  try {
    const shippers = await Shipper.find();
    res.json(shippers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get shipper by ID
exports.getShipperById = async (req, res) => {
  try {
    const shipper = await Shipper.findById(req.params.id);
    if (!shipper) {
      return res.status(404).json({ msg: 'Shipper not found' });
    }
    res.json(shipper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new shipper
exports.createShipper = async (req, res) => {
  const { user, companyName, contactNumber, address } = req.body;

  try {
    const newShipper = new Shipper({
      user,
      companyName,
      contactNumber,
      address
    });

    await newShipper.save();
    res.json(newShipper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing shipper
exports.updateShipper = async (req, res) => {
  const { user, companyName, contactNumber, address } = req.body;

  try {
    let updatedShipper = await Shipper.findById(req.params.id);

    if (!updatedShipper) {
      return res.status(404).json({ msg: 'Shipper not found' });
    }

    updatedShipper.user = user;
    updatedShipper.companyName = companyName;
    updatedShipper.contactNumber = contactNumber;
    updatedShipper.address = address;

    await updatedShipper.save();
    res.json(updatedShipper);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a shipper
exports.deleteShipper = async (req, res) => {
  try {
    const shipper = await Shipper.findById(req.params.id);

    if (!shipper) {
      return res.status(404).json({ msg: 'Shipper not found' });
    }

    await shipper.deleteOne();
    res.json({ msg: 'Shipper removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
