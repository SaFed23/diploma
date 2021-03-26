const User = require('../src/db/users');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { SALT } = require('../config');

const LOCAL_STRATEGY = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
},
  function (username, password, done) {
    User.findOne({username}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user || !user.checkPassword(password)) {
        return done(null, false, {message: 'User not found'});
      }
      return done(null, user);
    });
  }
);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SALT
}

const JWT_STRATEGY = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

module.exports = {
  LOCAL_STRATEGY,
  JWT_STRATEGY
}