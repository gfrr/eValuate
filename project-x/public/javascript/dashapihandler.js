const dbAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{
  click();
  console.log($("#currentUserItems").val().split(","));
  let itemsIds = $("#currentUserItems").val().split(",");
  if (itemsIds){
    itemsIds.forEach((id)=>{
      dbAPI.getOneRegister("items", id, test);
    });
  }


});


function test(result, target){
  console.log(target.toLowerCase());
  let offers = [];
  if (result.currentOffers.length > 0) {
    result.currentOffers.forEach((offer)=>{
      console.log(offer.amount);
      offers.push(offer.amount);
    });
  } else {
    offers = [`<p> No Current Offers </p>`];
  }

 $(`#${target.toLowerCase()}`).append(`<div class="row">

 <div class="row">
   <div class="col-sm-6 col-md-4">
     <div class="thumbnail">
       <img class="image-dash" src="${result.images[0].image}">
       <div class="caption">
          <h4>${result.title}</h4>
         <p>${result.keywords}</p>
         <p>
           <a href="/items/${result._id}" class="btn btn-default" role="button">Details</a>
           <a href="/items/${result._id}/edit" class="btn btn-default" role="button">Edit</a>
           <a href="/dashboard/remove/${result._id}" class="btn btn-danger" role="button">Remove</a>
           <br><br>
           <a class="evaluate" href="/users?experts">Evaluate</a>
         </p>
       </div>

       </div>
     </div>
     <div class="current-offers col-sm-4 col-md-4">
        <h3> Offers </h3>
        ${offers.join("<br><br>")}
       </div>
       </div>
       </div>
 </div>`);


  click();
  $(".offers-button").click(function(e){
    console.log("test: " + e);
    e.preventDefault();
    $('body').append($('<div/>')
      .attr("id", "popup-offer")
      .addClass("popup")
      .append("<span/>")
        .html(`<script src="/javascript/popup.js"></script>
        <a class="closelink" href="#"><img class="close-icon" src="/images/close.svg" alt=""></a><br>
        <img class="cvimage" src="/images/cv.png" alt="">`));
  });

}

function click(id){
  $('.rm').on('click', (e) => {
      console.log($(".rm"));
      console.log($(this).text());
      // console.log($(".currentUserId").val(), $(".itemId").val());
      // var userId = $(".currentUserId").val(), itemId = $(".itemId").val();
    //  dbAPI.updateOneRegister("users", userId, itemId);
    //  dbAPI.deleteOneRegister("items", itemId);
   });
}



/*
<div class="container" id="evaluated">
  <div class="row">

    <div class="col-sm-6 col-md-4">
      <div class="thumbnail">
        <img src="">
        <div class="caption">
          <h3></h3>
          <p>keywords</p>
          <p>
            <a href="#" class="btn btn-default" role="button">Details</a>
            <a href="#" class="btn btn-default" role="button">Edit</a>
            <a href="#" class="btn btn-default" role="button">Remove</a>
            <a href="#" class="btn btn-primary" role="button">Sell it!</a>
          </p>
        </div>

      </div>
    </div>
  </div>
</div>
*/
