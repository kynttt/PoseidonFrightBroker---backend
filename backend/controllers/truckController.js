const Truck = require('../models/Truck');

// @desc    Add a new truck
// @route   POST /api/trucks
// @access  Public (can be modified based on your application's needs)
exports.addTruck = async (req, res) => {
  const { licensePlate, model, capacity, status } = req.body;

  try {
    // Check if truck with the same license plate already exists
    let existingTruck = await Truck.findOne({ licensePlate });
    if (existingTruck) {
      return res.status(400).json({ msg: 'Truck with this license plate already exists' });
    }

    // Create new truck instance
    const newTruck = new Truck({
      licensePlate,
      model,
      capacity,
      status: status || 'Available', // Default to 'Available' if status is not provided
    });

    // Save truck to database
    await newTruck.save();

    res.json(newTruck); // Respond with the newly created truck object
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//Get trucks
exports.getTrucks = async (req, res) => {
    try {
      const trucks = await Truck.find();
      res.json(trucks);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


//Get Specefic truck
  exports.getTruck = async (req, res) => {
    try {
      const truck = await Truck.findById(req.params.id);
      if (!truck) {
        return res.status(404).json({ msg: 'Truck not found' });
      }
      res.json(truck);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };


//Update truck
  exports.updateTruck = async (req, res) => {
    const { licensePlate, model, capacity, status } = req.body;
  
    const truckFields = { licensePlate, model, capacity, status };
  
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


//Delete Truck
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