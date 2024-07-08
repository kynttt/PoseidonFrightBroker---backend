const Truck = require('../models/Truck');

// Create a new truck
exports.createTruck = async (req, res) => {
  const { licensePlate, model, capacity, status, type, size, rate, carrier } = req.body;

  try {
    const truck = new Truck({
      licensePlate,
      model,
      capacity,
      status,
      type,
      size,
      rate,
      carrier,
    });

    await truck.save();
    res.json(truck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all trucks
exports.getTrucks = async (req, res) => {
  try {
    const trucks = await Truck.find().populate('carrier');
    res.json(trucks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a truck by ID
exports.getTruck = async (req, res) => {
  try {
    const truck = await Truck.findById(req.params.id).populate('carrier');
    if (!truck) {
      return res.status(404).json({ msg: 'Truck not found' });
    }
    res.json(truck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a truck
exports.updateTruck = async (req, res) => {
  const { licensePlate, model, capacity, status, type, size, rate, carrier } = req.body;

  const truckFields = { licensePlate, model, capacity, status, type, size, rate, carrier };

  try {
    let truck = await Truck.findById(req.params.id);
    if (!truck) {
      return res.status(404).json({ msg: 'Truck not found' });
    }

    truck = await Truck.findByIdAndUpdate(req.params.id, { $set: truckFields }, { new: true });
    res.json(truck);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Delete a truck
exports.deleteTruck = async (req, res) => {
  try {
    let truck = await Truck.findById(req.params.id);
    if (!truck) {
      return res.status(404).json({ msg: 'Truck not found' });
    }

    await Truck.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Truck removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
