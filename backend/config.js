const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', true);
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Could not connect to MongoDB', err));

    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB', err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
