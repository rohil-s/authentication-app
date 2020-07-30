const getUserCredentials = require('../models/user').getUserCredentials;
const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = {
  registerUser: async (username, email, unhashedPassword) => {
    const UserCredentials = getUserCredentials();
    let newUser = new UserCredentials();
    const password = bcrypt.hashSync(unhashedPassword, saltRounds);
    newUser.email = email;
    newUser.password = password;
    newUser.username = username;
    await newUser.save();
  },
  setupPassport: async (passport) => {
    const authenticationFunction = async (username, password, done) => {
      try {
        const UserCredentials = getUserCredentials();
        const user = await UserCredentials.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Invalid Username/Password' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: 'Invalid Username/Password' });
        }
        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    };

    passport.use(
      new LocalStrategy({ usernameField: 'username' }, authenticationFunction)
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
      const UserCredentials = getUserCredentials();
      const user = await UserCredentials.findOne({ _id: id });
      if (!user) {
        return done(null, false, { message: 'Invalid Username/Password' });
      }
      return done(null, user);
    });
  },
};
