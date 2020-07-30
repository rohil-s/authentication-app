const mongoose = require('mongoose');
const { getMongoUri } = require('../constants/mongo');

let connection;

const mongoInit = async () => {
  try {
    const mongoUri = getMongoUri();
    connection = await mongoose.createConnection(mongoUri, {
      useNewUrlParser: true,
      poolSize: 10,
      useUnifiedTopology: true,
    });
    console.log('Successfully created connection pool with MongoDB');
  } catch (err) {
    console.log(err);
  }
};

const getConnection = () => {
  if (connection) {
    return connection;
  }
  throw Error('Connection not Initialized');
};

module.exports = {
  mongoInit,
  getConnection,
};
