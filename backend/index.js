const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactRoutes');

const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();


// Enable CORS for all origins (adjust as needed for security)
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use('/api/contact', contactRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
