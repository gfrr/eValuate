const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
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
  itemsUser:[{ type: Schema.Types.ObjectId, ref: 'Item' }]
});



const User = mongoose.model("User", userSchema);
module.exports = User;
