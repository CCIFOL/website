const express = require('express');
const connectDB = require('./config');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
