
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');


module.exports = function(passport) {
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
  });

  // =========================================================================
  // PORTAL LOGIN ============================================================
  // =========================================================================

  passport.use('timely-login', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {

    let selector = {'email' : email.toLowerCase() };
    User.findOne(selector,
      async function(err, user) {
        // In case of any error, return using the done method
        if (err) return done(err);

        // user with given email does not exist, flash error & redirect back
        if (!user) {
          return done(null, false, req.flash('invalid_email', 'Account not found'));
        }

        // User exists but wrong password, flash error
        const isValid = await user.isPasswordValid(password);
        if (!isValid) {
          return done(null, false, req.flash('invalid_password', 'Invalid Password'));
        }

        // User email and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
  }));
};//end export
