const dbAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{
test();
});

function test() {
$("#evaluate").click(()=>{
  $("#items").html("");
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
        <br>
        <br>
        <div class="col-sm-4" id="panelreqev" >
        <div class="col-m-4 id="panelreqev">
          <ul>
            <li><img class="items-img" src=${item.images[0].image} alt="" height="150px" ></img></li>
            <br>
            <li><strong>Title: </strong>${item.title}</li>
            <li><strong>Type: </strong>${item.type}</li>
            <li><strong>Description: </strong>${item.description}</li>
            <li><strong>Item's Estimated Age: </strong>${item.approxAge}</li>
            <li><strong> </strong>${item.approxAge}</li>
            <br>
            <a href="/items/${item._id}/requesteval?${expertId}" class="btn btn-primary" role="button">Request Evaluation</a>
          </a></li>
        </div>
        </div>

        `);

    });
  }
}
