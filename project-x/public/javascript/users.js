const dbAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{
test();
});

function test() {
$("#evaluate").click(()=>{
  console.log("click");
  dbAPI.getUserItems($("#userId").val(), printItems );
});
}


function printItems(response){
  console.log(response);
  const expertId = $("#expertId").val();
  if(typeof(response)!== "undefined"){
    response.forEach((item)=>{
      console.log(item);
      $("#items").append(`
        <div class="col-sm-2">
          <img class="items-img" src=${item.images[0].image} alt="" ></img>
        </div>
        <div class="col-sm-8">
          <ul>
            <li><strong>Title: </strong>${item.title}</li>
            <li><strong>Type: </strong>${item.type}</li>
            <li><strong>Description: </strong>${item.description}</li>
            <li><strong>Item's Estimated Age: </strong>${item.approxAge}</li>
            <li><strong> </strong>${item.approxAge}</li>
            <a href="/items/${item._id}/requesteval?${expertId}" class="btn btn-default" role="button">Request Evaluation</a>
          </a></li>
        </div>
        `);

    });
  }
}
