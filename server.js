const express = require('express');
const passport = require('passport');
const { setupPassport } = require('./services/authService');

const app = express();

require('dotenv').config();

require('./middleware')(app);

require('./services/mongo-connector')
  .mongoInit()
  .then(() => require('./models/init')())
  .then(() => setupPassport(passport))
  .then(() => {
    app.use(passport.initialize());
    app.use(passport.session());
  })
  .then(() => require('./routes')(app, passport));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
