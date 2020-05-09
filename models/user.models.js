var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  email: { type: String, trim: true, required: true },
  user: { type: String, trim: true, required: true },
  pass: { type: String, trim: true, required: true },
  avatar: { type: String, trim: true, default: 'http://res.cloudinary.com/pklevi/image/upload/v1588299846/w9rdhnyjvrppfepvolv2.png' }
})

var USER = mongoose.model('USER' , userSchema , 'user');
module.exports = USER;