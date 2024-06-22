const Address = require('../models/Address');

// Get all addresses
exports.getAllAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json(addresses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get address by ID
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ msg: 'Address not found' });
    }
    res.json(address);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Create a new address
exports.createAddress = async (req, res) => {
  const { address, city, state, zipCode, country } = req.body;

  try {
    const newAddress = new Address({
      address,
      city,
      state,
      zipCode,
      country
    });

    await newAddress.save();
    res.json(newAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
  const { address, city, state, zipCode, country } = req.body;

  try {
    let updatedAddress = await Address.findById(req.params.id);

    if (!updatedAddress) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    updatedAddress.address = address;
    updatedAddress.city = city;
    updatedAddress.state = state;
    updatedAddress.zipCode = zipCode;
    updatedAddress.country = country;

    await updatedAddress.save();
    res.json(updatedAddress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ msg: 'Address not found' });
    }

    await address.deleteOne();
    res.json({ msg: 'Address removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
