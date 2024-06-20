const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const truckRoutes = require('./routes/trucks');
const bookingRoutes = require('./routes/bookingRoutes');
const connectDB = require('./config/db');

const app = express();

require('dotenv').config();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Use Helmet to secure Express headers
app.use(helmet());

// Use JSON parser middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/bookings', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'An unexpected error occurred' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
