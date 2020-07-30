let passport = require('passport');
const { setupPassport } = require('../services/authService');
const registrationController = require('../controllers/register');

module.exports = async (app, passport) => {
  app.get('/', (req, res) => {
    res.send('Welcome to homepage');
  });
  app.post(
    '/api/v1/login',
    passport.authenticate('local', { successRedirect: '/' })
  );
  app.post('/api/v1/register', registrationController);
};
