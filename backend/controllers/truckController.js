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
