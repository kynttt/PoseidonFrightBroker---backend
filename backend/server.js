const express = require('express');
const helmet = require('helmet');
const userRoutes = require('./routes/userRoutes');
const truckRoutes = require('./routes/trucks');
const bookingRoutes = require('./routes/bookingRoutes');
const addressRoutes = require('./routes/addressRoutes');
const carrierRoutes = require('./routes/carrierRoutes');
const shipperRoutes = require('./routes/shipperRoutes');
const freightQuoteRoutes = require('./routes/freightQuoteRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const cors = require('cors');


const connectDB = require('./config/db');

const app = express();
app.use(cors());

require('dotenv').config();


const mongoose = require('mongoose');


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit process on connection failure
});

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Use Helmet to secure Express headers
app.use(helmet());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/trucks', truckRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/carriers', carrierRoutes);
app.use('/api/shippers', shipperRoutes);
app.use('/api/freight-quotes', freightQuoteRoutes);
app.use('/api/shipments', shipmentRoutes);

// Error handling middleware
// Improved error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof mongoose.Error.ValidationError) {
    res.status(400).json({ msg: err.message });
  } else if (err instanceof mongoose.Error.CastError) {
    res.status(400).json({ msg: 'Invalid ID' });
  } else {
    res.status(500).json({ msg: 'An unexpected error occurred' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
