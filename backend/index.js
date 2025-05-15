const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fetch = require('node-fetch');

const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Self-ping every 12 minutes (720,000 ms)
const SELF_PING_INTERVAL = 12 * 60 * 1000;
const SELF_URL = process.env.SELF_URL || 'https://website-cmd8.onrender.com';

setInterval(() => {
  fetch(SELF_URL)
    .then(res => {
      console.log(`Self-ping successful: ${res.status}`);
    })
    .catch(err => {
      console.error('Self-ping failed:', err.message);
    });
}, SELF_PING_INTERVAL);
