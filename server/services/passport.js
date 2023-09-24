const passport = require('passport');
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

dotenv.config();
const User = mongoose.model('users');


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    try {
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        }
        else {
          new User({
            googleId: profile.id
          }).save().then(user => done(null, user));
        }
      });
    }
    catch (error) {
      console.log(`Something went wrong while searching for user.
      ${error}`.bgRed);
    }
  }
));