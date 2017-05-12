const dbAPI = new APIHandler("https://ironhackevaluation.herokuapp.com");

$(document).ready(()=>{
  dbAPI.getFeedbackInfo($("#itemId").val(), feedInfo);
});

function feedInfo(res){
  console.log(res);
  $("#suggestedValue").html(`<strong>Suggested Value: </strong> ${res.estimatedValue}`);
  $("#reviewer").html(`<a href="/users/${res.userId}">Reviewer profile</a>`);
  $("#comment").html(`<strong>Reviewer comment: </strong> ${res.comments}`);
}


/*
<li id="suggestedValue"></li>
<li id="reviewer"></li>
<li id="comment"></li>

const feedbackSchema = new Schema({
  comments: String,
  estimatedValue: Number,
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
});

*/
