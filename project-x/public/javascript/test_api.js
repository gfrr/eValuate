const dbAPI = new APIHandler("http://localhost:3000");

$(document).ready(()=>{
  dbAPI.getFullList("users");
  dbAPI.getFullList("items");

});
