const express = require('express');
const passport = require('passport');
const { setupPassport } = require('./services/authService');

const app = express();

(async () => {
  require('dotenv').config();

  require('./middleware')(app);

  await require('./services/mongo-connector').mongoInit();

  await require('./models/init')();

  await setupPassport(passport);

  app.use(passport.initialize());
  app.use(passport.session());

  require('./routes')(app, passport);
})();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
