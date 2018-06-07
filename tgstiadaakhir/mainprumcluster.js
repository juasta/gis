//mnenginisiasi database firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyA2ZPc949EFMTmr-G9_h62yfbarermXfeM",
    authDomain: "sigprak-e1936.firebaseapp.com",
    databaseURL: "https://sigprak-e1936.firebaseio.com",
    projectId: "sigprak-e1936",
    storageBucket: "",
    messagingSenderId: "62595149343"
  };
  firebase.initializeApp(config);

  var db = firebase.database();
  var markerRef = db.ref('markers');
  //console.log(markerRef);
  
  document.getElementById('simpan').addEventListener('click',
    function (evt) {
        // console.log("klik ",lat.value,lng.value,infomarker.value);
        markerRef.push(
            {
                type: 'point',
                coordinate: { lat: parseFloat(lat.value), lng: parseFloat(lng.value) },
                properties: {
                    info: infomarker.value,
                    categories: {
                        kuliner: document.forms[0].cats[0].checked,
                        kantor: document.forms[0].cats[1].checked,
                        taman: document.forms[0].cats[2].checked,
                        tempatibadah: document.forms[0].cats[3].checked
                    }
                }
            }
        );
    });
    function updateInfo(data) {
        var marker = data.val();
        var info = "";
        kunci = Object.keys(data.val());
        markers=[];
        for (var i = 0; i < kunci.length; i++) {
            console.log(marker[kunci[i]].coordinate.lat);
            var position = { lat: marker[kunci[i]].coordinate.lat, 
            lng: marker[kunci[i]].coordinate.lng };
            var newmarker=createMarker(position, null, 
            marker[kunci[i]].properties.info);
            markers.push(newmarker);
        }
    }

    var lat = document.getElementById('lat');
    var lng = document.getElementById('lng');
    var infomarker = document.getElementById('infomarker');

    function createMarker(position, iconImg = null, info = null) {
        var marker = new google.maps.Marker(
            {
                position: position,
                icon: iconImg
            }
        );
        if (info) {
            var infowindow = new google.maps.InfoWindow(
                {
                    content: info
                }
            );
    
            marker.addListener('click', function (e) {
                infowindow.open(map, marker);
            });
        }
        return marker;
    }

var map = null;
var markers=[];

function showErr(err) {
    document.getElementById('info').innerHTML = "Ada error " + err;
}

markerRef.on('value', updateInfo, showErr);


function initMap() {
    var center = { lat: -5.351645650506815, lng: 105.40080353027338 };
    var options = {
        center: center,
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById('map'), options);
       createMarker(center).setMap(map);
}