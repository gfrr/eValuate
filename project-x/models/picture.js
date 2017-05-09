const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Item = require('./item');

const pictureSchema = new Schema({
  image: String, // change it to image
  pic_name: String
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});


var Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
