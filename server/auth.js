const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
const jwt = require('passport-jwt');
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const logger = require('./logger');
const User = require('./models/User');
const config = require('../conf/config.json');

passport.use('openidconnect', new OpenIDConnectStrategy({
  authorizationURL: config.openIdConnect.authUrl,
  tokenURL: config.openIdConnect.tokenUrl,
  userInfoURL: config.openIdConnect.userInfoUrl,
  clientID: config.openIdConnect.clientId,
  clientSecret: config.openIdConnect.clientSecret,
  callbackURL: config.openIdConnect.callbackUrl
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ _id: profile.id }, (err, user) => {
    if (err) {
      logger.error(`Error loading user with ID ${profile.id}`, err);
      done(err, false);
    } else if (user) {
      logger.debug('Received profile', profile);

      user.name = profile._json.name;
      user.picture = profile._json.picture || '/blankPhoto.png';
      user.email = profile._json.email;

      user.save(saveErr => {
        if (saveErr) {
          logger.error(`Error updating user ${profile.id}`, saveErr);
          done(saveErr, false);
        } else {
          done(null, user);
        }
      });
    } else {
      logger.debug('No user record for this user, creating new User');
      const newUser = new User({
        _id: profile.id,
        name: profile._json.name,
        picture: profile._json.picture || '/blankPhoto.png',
        email: profile._json.email
      });

      newUser.save(saveErr => {
        if (saveErr) {
          logger.error(`Error saving new user with ID ${profile.id}`, saveErr);
          done(saveErr, false);
        } else {
          done(null, newUser);
        }
      });
    }
  });
}));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret
};

passport.use('jwt', new JwtStrategy(jwtOptions, (payload, done) => {
  User.findOne({ _id: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  });
}));
