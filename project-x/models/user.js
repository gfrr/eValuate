const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./item');

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  address:{
    street: String,
    postCode: String,
    city: String,
    country: String,
    coordinates: [Number, Number]
  },
  role: {
    type: String,
    enum: ['User','Owner','Professional','Admin'],
    default: 'User'
  }
});



const User = mongoose.model("User", userSchema);
module.exports = User;
