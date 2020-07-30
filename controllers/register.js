const bcrypt = require('bcrypt');
const { DUPLICATE_KEY_ERROR_CODE } = require('../constants/mongo');
const authService = require('../services/authService');

const saltRounds = 10;

module.exports = async (req, res) => {
  const { username, email, password1, password2 } = req.body;
  try {
    if (password1 !== password2) {
      req.status(400).send({ error: { message: 'Passwords do not match' } });
      return;
    }
    await authService.registerUser(username, email, password1);
    res.status(201).send({ loginCreated: true });
  } catch (err) {
    if (err.code === DUPLICATE_KEY_ERROR_CODE) {
      const field = Object.keys(err.keyValue)[0];
      const message = `'${field}' is already registered with us`;
      return res.status(400).send({ err, message });
    }
    res.status(500).send({ error: err, message: err.message });
  }
};
