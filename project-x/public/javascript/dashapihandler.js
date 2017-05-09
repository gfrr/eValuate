const dbAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{
  console.log($("#currentUserItems").val().split(","));
  let itemsIds = $("#currentUserItems").val().split(",");
  if (itemsIds){
    itemsIds.forEach((id)=>{
      dbAPI.getOneRegister("items", id, test);
    });
  }
  click();

});


function click(){
  $('.rm').on('click', (e) => {
      console.log($("#currentUserId").val(), $("#itemId").val());
      var userId = $("#currentUserId").val(), itemId = $("#itemId").val();
     dbAPI.updateOneRegister("users", userId, itemId);
     dbAPI.deleteOneRegister("items", itemId);
   });
}


function test(result){
 $("#evaluated").append(`<div class="row">

   <div class="col-sm-6 col-md-4">
     <div class="thumbnail">
       <img src="${result.images[0].image}">
       <div class="caption">
         <h3>${result.title}</h3>
         <p>${result.keywords}</p>
         <p>
           <a href="#" class="btn btn-default" role="button">Details</a>
           <a href="#" class="btn btn-default" role="button">Edit</a>
           <button id="rm" class="btn btn-danger">Remove</button>
           <a href="#" class="btn btn-primary" role="button">Sell it!</a>
         </p>
       </div>

     </div>
   </div>
   <input type="hidden" id="itemId" value=${result._id}>
 </div>`);
 click();
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
