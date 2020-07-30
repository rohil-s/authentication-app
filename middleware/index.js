const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

module.exports = (app) => {
  app.use(morgan('tiny'));
  app.use(cors(['http://localhost:3000']));
  app.use(
    session({
      secret: 'New encryption secret',
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(express.json());
};
