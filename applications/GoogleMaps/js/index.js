window.onload = () => {
  displayStores();

}


var map;
var markers = [];
var infoWindow;

function initMap() {
    var ph = {
        lat: 14.5995,
        lng: 120.9842
    };

    map = new google.maps.Map(document.getElementById('map'), {
      center: ph,
      zoom: 11,
      mapTypeId: 'roadmap',
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
    infoWindow =  new google.maps.InfoWindow();
    showStoresMarkers();
}

function displayStores(){
  var storesHtml = '';
  var counter = 1;
  for(var [index, store] of stores.entries()){
    var coordinates = {
      lat: store.store.coordinates.latitude,
      lng: store.store.coordinates.longitude
    };

    var storeAddress1 = store.store.address.streetAddressLine1;
    var storeAddress2 = store.store.address.streetAddressLine2;
    var phone = store.store['phoneNumber'];
    
    if(storeAddress2 == null)
      storeAddress2 = ''
    if(phone == null)
      phone = 'NUMBER UNAVAILABLE'
    else
      phone = phone.substr(0,3) + '-' + phone.substr(3, 4);

    storesHtml +=`
    <div class="store-container">
      <div class="store-info-container">    
        <div class="store-address">
          <span>${storeAddress1}</span>
          <span>${storeAddress2}</span>
        </div>
          <div class="store-phone-number">
          ${phone}
          </div>
        </div>
        <div class="store-number-container">
          <div class="store-number">${index + 1}</div>    
      </div>
    </div>
    `

  document.querySelector('.stores-list').innerHTML = storesHtml;

  }

}

function showStoresMarkers(){
  var bounds = new google.maps.LatLngBounds();

  for(var [index, store] of stores.entries()){
    var coordinates = new google.maps.LatLng(
      store.store.coordinates.latitude,
      store.store.coordinates.longitude
    )
    var name = store.store.name;
    var phone = store.store.phoneNumber;
    var time = [store.store.regularHours.monday.openTime, store.store.regularHours.monday.closeTime];

    if(phone == null){
      phone = 'NOT AVAILABLE';
    }
       

    var address = store.store.address.streetAddressLine1;
    
    bounds.extend(coordinates);
    createMarker(name, address, coordinates, index+1, phone, time);
    map.fitBounds(bounds);
  }

}

function createMarker(name, address, coordinates, index, phone, time){
  var html = 
  `<b>${name}</b>
  <br/>
  <span class="time">Service Hours: ${time[0].substr(0,5)} - ${time[1].substr(0,5)}</span>
  <br/>
  <i class="fas fa-thumbtack"></i> <a href="https://maps.google.com/?q=${name}" target="_blank">${address}</a><br>
  <i class="fas fa-phone"></i> <span class="phone">${phone}</span>`;
  var icon = {
    url: "../style/starbucks.png",
    scaledSize: new google.maps.Size(30, 30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
};


  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    label: index.toString(),
    icon: icon
  });

  google.maps.event.addListener(marker, 'click', function(){
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });


  markers.push(marker);

}
