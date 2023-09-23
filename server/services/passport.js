const passport = require('passport');
const dotenv = require('dotenv')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();

passport.use(new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
  }
));