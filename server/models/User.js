const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String
}, { timestamps: true })

mongoose.model('users', userSchema)