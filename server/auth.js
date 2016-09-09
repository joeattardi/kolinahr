const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const jwt = require('passport-jwt');
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const config = require('./config');
const User = require('./models/User');

passport.use('github', new GitHubStrategy({
  clientID: config.clientID,
  clientSecret: config.clientSecret,
  callbackURL: 'http://localhost:3000/auth/github/callback'
},

(accessToken, refreshToken, profile, done) => {
  User.findOne({ githubId: profile.id }, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      const newUser = new User({
        githubId: profile.id,
        name: profile.displayName,
        avatarUrl: profile._json.avatar_url
      });
      console.dir(newUser);
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
  secretOrKey: config.jwtSecret
};

passport.use('jwt', new JwtStrategy(jwtOptions, (payload, done) => {
  User.findOne({ githubId: payload.sub }, (err, user) => {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  });
}));
