const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { DBConnect } = require('./config/DBConnect');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');
require('./routes/authRoutes.js');

dotenv.config();
DBConnect();
const app = express();

app.use('/', (req, res) => {
  res.send("<h1>Welcome to Emaily App...</h1>");
})

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes.js')(app);

const PORT = process.env.PORT || 8000;
app.listen(8080, () => {
  try {
    console.log(`Server connected to PORT ${PORT}`.bgGreen);
  }
  catch (error) {
    console.log(`Could not connect to the server. Error: ${error}`.bgRed);
  }
});
