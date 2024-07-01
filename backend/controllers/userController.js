const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { name, email, password, phone, address, postalCode, companyName, isAdmin } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !password || !phone || !address || !postalCode) {
      return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password,
      phone,
      address,
      postalCode,
      companyName: companyName || '', // Set default if not provided
      isAdmin: isAdmin || false, // Set isAdmin based on request or default to false
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Generate JWT token
    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // Log the user data
    console.log('User found during login:', user);

    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };

    // Log the payload being used for token generation
    console.log('Payload for JWT:', payload);

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


// Get all users
exports.getUsers = async (req, res) => {
  console.log('Request User:', req.user);
  
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


//get one User
exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

//update User
exports.updateUser = async (req, res) => {
    const { name, email, phone } = req.body;
  
    const userFields = { name, email, phone };
  
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      user = await User.findByIdAndUpdate(req.params.id, { $set: userFields }, { new: true });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

//Delete User
exports.deleteUser = async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await User.findByIdAndDelete(req.params.id);
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  