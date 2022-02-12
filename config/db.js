const mongoose = require('mongoose');
const config = require('config');
const mongoDB = config.get('mongoURI'); //Get mogoURL from config file

//Using Mongoose connect with mongoDB

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
    //Exit Process with Failure
    process.exit(1);
  }
};

module.exports = connectMongoDB;
