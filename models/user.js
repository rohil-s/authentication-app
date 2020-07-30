const mongoose = require('mongoose');

const getConnection = require('../services/mongo-connector').getConnection;

const userCredentialsSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  mobileNumber: { type: Number },
  twoFactorEnabled: { type: Boolean, default: false },
});

const userDetailsSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  name: String,
  email: { type: String, unique: true, required: true },
  mobileNumber: { type: Number },
  address: String,
});

let UserCredentials, UserDetails;

async function init() {
  const connection = getConnection();
  UserCredentials = connection.model('UserCredentials', userCredentialsSchema);
  UserDetails = connection.model('userDetails', userDetailsSchema);
}

const getUserCredentials = () => UserCredentials;

const getUserDetails = () => UserDetails;

module.exports = {
  init,
  getUserCredentials,
  getUserDetails,
};
