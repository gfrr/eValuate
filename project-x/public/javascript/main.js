

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
    var myMarker = new google.maps.Marker({
      position: position,
      map: map,
      title: "You are here"
    });
    return position;
  }

function updateMap(position, radius, zoomIndex) {
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: position,
    radius: radius,
    type: type,
  }, callback);

  let markers = [];
  experts.forEach(function(expert){
    let name = expert.firstName;
    let position = {
      lat: expert.address.coordinates[0],
      lng: expert.address.coordinates[1]
    };

    var icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    if(places.description === "coffeeshop"){
      icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';
    }

    var pin = new google.maps.Marker({position, map, title, icon});
    markers.push(pin);
  });

   function callback(results, status) {
       if (status === google.maps.places.PlacesServiceStatus.OK) {
         for (var i = 0; i < results.length; i++) {
           createMarker(results[i]);
         }
       }
     }
   function createMarker(place) {
       var placeLoc = place.geometry.location;
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });
       google.maps.event.addListener(marker, 'click', function() {
         console.log(place);
         let image= "";
         if(place.hasOwnProperty("photos")) image = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});
         $("#click-info").html(`
           <div>${place.name}</div>
           <div>${place.vicinity}</div>
           <div><img src="${image}"></div>
           <div>${place.types.join(" ")}</div>
           `);
       });
     }
}

$(document).ready(()=>{

  let position = startMap();
  let radius;
  let zoomIndex;
  let tmpRadius = document.getElementById("selectradius").value;
  if (tmpRadius === "10") {
    radius = 10000;
    zoomIndex = 14;
  } else if (tmpRadius === "25") {
    radius = 25000;
    zoomIndex = 12;
  } else if (tmpRadius === "50") {
    radius = 50000;
    zoomIndex = 10;
  } else if (tmpRadius === "100") {
    radius = 100000;
    zoomIndex = 8;
  } else {
    radius = 10000;
    zoomIndex = 14;
  }
  updateMap(position, radius, zoomIndex);

});
