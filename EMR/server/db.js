const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://Admin:JgGT6fVIAspDSW6x@emr-cluster.0offtiu.mongodb.net/'
const connectToMongoDB = async (uri) => {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
    }
};

connectToMongoDB(connectionString)
  
module.exports = connectToMongoDB;