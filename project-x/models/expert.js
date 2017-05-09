const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = require('./item');
const User = require('./user');

const expertSchema = new Schema({
  cv: String,
  certificate: String,
  photo: String,
  website: String,
  focus: [], // i.e. Stamps, Coins etc. It can be one or more.
  userId: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});



const Expert = mongoose.model("Expert", expertSchema);
module.exports = Expert;
