const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// Your User model import here
const User = require('../models/user');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Authentication logic here
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
