const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  comments: String,
  estimatedValue: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
});



const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
