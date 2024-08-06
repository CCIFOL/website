const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const mediaRouter = require('./routes/media');
const prayerRequestRoutes = require('./routes/prayerRequestRoutes');
const eventsRouter = require('./routes/events');

const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS for all origins (adjust as needed for security)
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/media', mediaRouter);
app.use('/api/events', eventsRouter);
app.use('/prayer-requests', prayerRequestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
