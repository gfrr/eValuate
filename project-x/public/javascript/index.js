const itemsAPI = new APIHandler("http://localhost:3000/api/items");

$('#offer').on('submit', (e) => {
  e.preventDefault();
  var itemId = $('input[name="chr-id"]').val();
  console.log(newCharId);

  const newItemInfo = {
    currentOffers: [    ]
  };
  console.log(newItemInfo);
  itemsAPI.updateOneRegister(newItemInfo, itemId);
});


function showFeedback (postResponse) {
  console.log('post success');
  console.log(postResponse);
}

function handleError (err) {
  console.log('Oh no! Error:');
  console.log(err);
}
