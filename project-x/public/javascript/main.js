const expertAPI = new APIHandler("http://localhost:3000");

  function startMap() {

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
    } else if (tmpRadius === "250") {
      radius = 2500000;
      zoomIndex = 7;
    } else {
      radius = 10000;
      zoomIndex = 12;
    }
    console.log("this is the radius " + radius);

    var position = {
  	    lat: Number(document.getElementById("latitude").value),
  	    lng: Number(document.getElementById("longitude").value)
    };
    console.log("this is the position: " + position);
    console.log(position);
    const map = new google.maps.Map(
      document.getElementById('map'),
        {
          zoom: zoomIndex,
          center: position,
          disableDefaultUI: true
        }
    );
    map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
    var myMarker = new google.maps.Marker({
      position: position,
      map: map,
      title: "You are here"
    });
    updateMap(map,position,radius,zoomIndex);
  }

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
      google.maps.event.addListener(pin, 'click', function() {
        let tmpId = expertAPI.getIdByEmail(expert.email, printID);
        console.log(tmpId);
         $("#click-info").html(`
           <div><img src="/images/arrowdown.svg"></div>
           <div><strong>${expert.firstName}&nbsp${expert.lastName}</strong></div>
           <div><a id="targetId" href="">Go to Profile</a></div>
           <div><input id="expertemail" type="hidden" value="${expert.email}" ></div>
           `);
       });
     }
  });
}

function getDistance(lat1, lon1, lat2, lon2) {
// haversine formular, to measure distance between two points on earth
     Number.prototype.toRad = function() {
        return this * Math.PI / 180;
     };

     var R = 6371; // earth radius in KM
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
     return d; // distance in KM
}

$(document).ready(()=>{
  startMap();
});

function restartMap() {
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
    zoomIndex = 9;
  } else if (tmpRadius === "250") {
    radius = 2500000;
    zoomIndex = 7;
  } else {
    radius = 10000;
    zoomIndex = 12;
  }

  var position = {
      lat: Number(document.getElementById("latitude").value),
      lng: Number(document.getElementById("longitude").value)
  };
  const map = new google.maps.Map(
    document.getElementById('map'),
      {
        zoom: zoomIndex,
        center: position,
        disableDefaultUI: true
      }
  );
  map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
  var myMarker = new google.maps.Marker({
    position: position,
    map: map,
    title: "You are here"
  });
  updateMap(map,position,radius,zoomIndex);
});
}

function printID (result) {
  console.log("test: " + result._id);
  $('#targetId').attr("href","/users/" + result._id);
  return result._id;
}
