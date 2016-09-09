const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const jwt = require('passport-jwt');
const JwtStrategy = jwt.Strategy;
const ExtractJwt = jwt.ExtractJwt;
const User = require('./models/User');

passport.use('github', new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
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
