const mongoose = require('mongoose');
const config = require('config');
const db = config.get('MongoUri');

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const connectDB = async () => {
  try {
    await mongoose.connect(db, dbOptions);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
