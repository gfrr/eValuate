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
function test(result){
 $("#evaluated").append(`<div class="row">

   <div class="col-sm-6 col-md-4">
     <div class="thumbnail">
       <img src="${result.images[0].image}">
       <div class="caption">
         <h3>${result.title}</h3>
         <p>${result.keywords}</p>
         <p>
           <a href="/items/${result._id}" class="btn btn-default" role="button">Details</a>
           <a href="/items/${result._id}/edit" class="btn btn-default" role="button">Edit</a>
           <a href="/dashboard/remove/${result._id}" class="btn btn-danger" role="button">Remove</a>
           <a href="#" class="btn btn-primary" role="button">Sell it!</a>
         </p>
       </div>

     </div>
   </div>

 </div>`);
  click();
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
