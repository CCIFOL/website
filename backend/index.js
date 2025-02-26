const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const mediaRouter = require('./routes/media');
const eventsRouter = require('./routes/events');

const dotenv = require('dotenv');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
