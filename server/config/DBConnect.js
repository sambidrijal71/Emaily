const mongoose = require('mongoose');

const DBConnect = async () => {
  try {
    const connectDB = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Server connected to ${connectDB.connection.host}`.bgGreen)
  } catch (error) {
    console.log(`Error while connecting to the server. Error: ${error}`.bgRed)
  }
}

module.exports = { DBConnect }