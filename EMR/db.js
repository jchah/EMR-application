const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://EthanMcMullen:oE9PpZGE4x7rl9F7@emr-cluster.pnf0csj.mongodb.net/?retryWrites=true&w=majority&appName=EMR-Cluster'
//const connectionString = 'mongodb+srv://EthanMcMullen:oE9PpZGE4x7rl9F7@cluster0.eyajqey.mongodb.net';
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