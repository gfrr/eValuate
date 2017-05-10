

  function startMap() {
    var position = {
  	    lat: Number(document.getElementById("latitude").value),
  	    lng: Number(document.getElementById("longitude").value)
    };
    console.log(position);
        const map = new google.maps.Map(
          document.getElementById('map'),
          {
            zoom: 15,
            center: position
          }
        );
      }
$(document).ready(()=>{

startMap();

});
