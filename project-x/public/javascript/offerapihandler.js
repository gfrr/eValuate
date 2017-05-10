const itemsAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{

  $('#makeoffer').on('click', (e) => {
    console.log("test: " + e.target);
    e.preventDefault();
    var itemId = $('input[name="item-id"]').val();
    console.log("this is the item Id: " + itemId);

    const thisOffer = {
      amount: $('input[name="makeoffer"]').val(),
      bidder: $('input[name="user-id"]').val()
    };

    console.log(thisOffer);
    itemsAPI.updateOneItem(thisOffer,itemId);
  });

});



function showFeedback (postResponse) {
  console.log('post success');
  console.log(postResponse);
}

function handleError (err) {
  console.log('Oh no! Error:');
  console.log(err);
}
