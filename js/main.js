//=========================================================================================================//

//----------------------------------------------UBER-------------------------------------------------------//

//=========================================================================================================//

var UberApi = (function(options){

  var shared = {};
  var options = options || {};
  var clientID = 'G4fQOJA6iRyCzWcqy8mFihrZK3orC7uc';
  
  var url = 'https://m.uber.com/ul?client_id=G4fQOJA6iRyCzWcqy8mFihrZK3orC7uc&action=setPickup&pickup[latitude]=37.775818&pickup[longitude]=-122.418028&pickup[nickname]=UberHQ&pickup[formatted_address]=1455%20Market%20St%2C%20San%20Francisco%2C%20CA%2094103&dropoff[latitude]=37.802374&dropoff[longitude]=-122.405818&dropoff[nickname]=Coit%20Tower&dropoff[formatted_address]=1%20Telegraph%20Hill%20Blvd%2C%20San%20Francisco%2C%20CA%2094133&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d&link_text=View%20team%20roster&partner_deeplink=partner%3A%2F%2Fteam%2F9383';
    
  function setupListeners() {
    setupSearch();
  }

  function setupSearch(){
    $('form[name=search] button').click(function(event) {
        // console.log("searching");

        var $e = $(event.currentTarget),
            $form = $e.closest('form'),
            params = {},
            $results = $form.find('.results ul'),
            keyword = $form.find('input[name=q]').val();

        $.ajax({
          url: url,
          method: 'GET',
          dataType: 'json',
          data: params,
        })
        .done(function(data) {
          console.log("success",data);
        });

        return false;
    });
  }

  var init = function() {
    setupListeners();
  };
  shared.init = init;

  return shared;


}());
UberApi.init();
//=========================================================================================================//

//---------------------------------------------Google Maps-------------------------------------------------//

//=========================================================================================================//

var GoogleMapApi = (function(options){
	
  var myLatLng = {
      lat: 33.742712, 
      lng: -84.338520
      }; // initial center point of map

  var map, infoWindow;

  function initMap() {
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 3
    });
    
    var marker = new google.maps.Marker({
      position:myLatLng,
      map: map,
      title: 'My House',
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('My House');
        infowindow.open(map, this);
    });
  };
  
  function createMarker(result) {
    var marker = new google.maps.Marker({
      position: result.geometry.location,
      map: map,
      title: result.name,
      animation: google.maps.Animation.DROP
    });
    
    google.maps.event.addListener(marker, 'click', function() {
        createInfoWindow(result, marker);
        infowindow.open(map, this);
    });
  };

  function createInfoWindow(result, marker) {
    var contentString = `<h3 class="marker-title">${result.title}<h3>`
    infowindow.setContent(contentString);
  };

  return {
    init: initMap,
    createMarker: createMarker
  };

}());



