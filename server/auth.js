const passport = require('passport');
const OpenIDConnectStrategy = require('passport-openidconnect').Strategy;
const jwt = require('passport-jwt');
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const User = require('./models/User');

passport.use('openidconnect', new OpenIDConnectStrategy({
  authorizationURL: process.env.OPENID_CONNECT_AUTHORIZATION_URL,
  tokenURL: process.env.OPENID_CONNECT_TOKEN_URL,
  userInfoURL: process.env.OPENID_CONNECT_USER_INFO_URL,
  clientID: process.env.OPENID_CONNECT_CLIENT_ID,
  clientSecret: process.env.OPENID_CONNECT_CLIENT_SECRET,
  callbackURL: process.env.OPENID_CONNECT_CALLBACK_URL
},
(accessToken, refreshToken, profile, done) => {
  User.findOne({ _id: profile.id }, (err, user) => {
    if (err) {
      console.log(err);
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      const newUser = new User({
        _id: profile.id,
        name: profile._json.name,
        picture: profile._json.picture
      });

      newUser.save(saveErr => {
        if (saveErr) {
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
  secretOrKey: process.env.JWT_SECRET
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
