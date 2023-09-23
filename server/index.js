const express = require('express');
const dotenv = require('dotenv')
require('./services/passport')
dotenv.config();
require('./routes/authRoutes.js')
const app = express();

app.get('/', (req, res) => {
  res.send("<h1>Welcome to Emaily App...</h1>")
})
require('./routes/authRoutes.js')(app)

const PORT = process.env.PORT || 8000;
app.listen(8080, () => {
  console.log(`Server connected to PORT ${PORT}`);
});
