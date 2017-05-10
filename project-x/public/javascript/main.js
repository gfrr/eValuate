

  function startMap(radius, zoomIndex) {
    var position = {
  	    lat: Number(document.getElementById("latitude").value),
  	    lng: Number(document.getElementById("longitude").value)
    };
    console.log(position);
    const map = new google.maps.Map(
      document.getElementById('map'),
        {
          zoom: zoomIndex,
          center: position
        }
    );
    var myMarker = new google.maps.Marker({
      position: position,
      map: map,
      title: "You are here"
    });
    updateMap(map,position,radius,zoomIndex);
  }

  //
  //
  // infowindow = new google.maps.InfoWindow();
  // var service = new google.maps.places.PlacesService(map);
  // service.nearbySearch({
  //   location: position,
  //   radius: radius,
  //   type: type,
  // }, callback);
function updateMap(map,position,radius,zoomIndex) {
  let markers = [];
  experts.forEach(function(expert){
    let latA = position.lat;
    console.log("latA " + latA);
    let lngA = position.lng;
    console.log("lngA " + lngA);
    let latB = expert.address.coordinates[0];
    console.log("latB " + latB);
    let lngB = expert.address.coordinates[1];
    console.log("lngB " + lngB);
    if (getDistance(latA,lngA,latB,lngB) <= radius/1000) {
      let icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
      let name = expert.firstName + " " + expert.lastName;
      let newPosition = {
          lat: expert.address.coordinates[0],
          lng: expert.address.coordinates[1]
      };
      var pin = new google.maps.Marker({
        position: newPosition,
        map: map,
        title: name,
        icon: icon
      });
      markers.push(pin);

    }
  });

  //  function callback(results, status) {
  //      if (status === google.maps.places.PlacesServiceStatus.OK) {
  //        for (var i = 0; i < results.length; i++) {
  //          createMarker(results[i]);
  //        }
  //      }
  //    }
  //  function createMarker(place) {
  //      var placeLoc = place.geometry.location;
  //      var marker = new google.maps.Marker({
  //        map: map,
  //        position: place.geometry.location
  //      });
  //      google.maps.event.addListener(marker, 'click', function() {
  //        console.log(place);
  //        let image= "";
  //        if(place.hasOwnProperty("photos")) image = place.photos[0].getUrl({'maxWidth': 100, 'maxHeight': 100});
  //        $("#click-info").html(`
  //          <div>${place.name}</div>
  //          <div>${place.vicinity}</div>
  //          <div><img src="${image}"></div>
  //          <div>${place.types.join(" ")}</div>
  //          `);
  //      });
  //    }
}

function getDistance(lat1, lon1, lat2, lon2) {

     Number.prototype.toRad = function() {
        return this * Math.PI / 180;
     };

     var R = 6371; // km
     //has a problem with the .toRad() method below.
     var x1 = lat2-lat1;
     var dLat = x1.toRad();
     var x2 = lon2-lon1;
     var dLon = x2.toRad();
     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                     Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
                     Math.sin(dLon/2) * Math.sin(dLon/2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c;
     console.log(d);
     return d;
}

$(document).ready(()=>{

  let radius;
  let zoomIndex;
  let tmpRadius = String(document.getElementById("selectradius").value);
  if (tmpRadius === "10") {
    radius = 10000;
    zoomIndex = 12;
  } else if (tmpRadius === "25") {
    radius = 25000;
    zoomIndex = 11;
  } else if (tmpRadius === "50") {
    radius = 50000;
    zoomIndex = 10;
  } else if (tmpRadius === "100") {
    radius = 100000;
    zoomIndex = 8;
  } else {
    radius = 10000;
    zoomIndex = 12;
  }
  startMap(radius,zoomIndex);



});
