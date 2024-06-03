const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();
const connectionString = process.env.MONGO_URI;
const connectToMongoDB = async (uri) => {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
};

connectToMongoDB(connectionString);
  
module.exports = connectToMongoDB;