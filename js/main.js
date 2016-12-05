//=========================================================================================================//

//----------------------------------------------Bands In Town API-------------------------------------------------------//

//=========================================================================================================//

var BandsApi = (function(options){

  var shared = {};
  var options = options || {};
     
  function setupListeners() {
    setupSearch();
  }

  function setupSearch(){
    $('form[name=search] button').click(function(event) {
        // console.log("searching");

        var $e = $(event.currentTarget),
            $form = $e.closest('form'),  
            artist = $form.find('input[name=q]').val();

        $.ajax({
          url: 'http://api.bandsintown.com/artists/'+artist+'/events.json?/api_version=2.0&app_id=Gigabite',
          method: 'GET',
          dataType: 'jsonp'
        })
        .done(function(data) {
          // console.log("success",data);
          displayDates(data);
        });
        //Remember to install the widget

        return false;
    });
  }

   function displayDates(data, result) {

    for (var i = 0; i < data.length; i++) {
        var r = data[i];
        console.log(r);
       
        if(r.venue){
          
          GoogleMapApi.createMarker({
            geometry: {
              location: { 
                lng: r.venue.longitude,
                lat: r.venue.latitude
              }
            },
            title: r.venue.name,
            url:r.url,
            date:new Date(r.datetime,['America/New_York']).toLocaleString()  
          });
        
        }
      }
    }

  var init = function() {
    setupListeners();
  };
  shared.init = init;

  return shared;


}());
BandsApi.init();
//=========================================================================================================//

//---------------------------------------------Google Maps-------------------------------------------------//

//=========================================================================================================//

var GoogleMapApi = (function(options, r){
  
  var myLatLng = {lat: 38.4394932, lng: -88.8991953}; // initial center point of map

  var map, infoWindow;

  function initMap() {
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 3
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
    console.log(r);
    var contentString = `<h3 class="marker-title">Venue: ${result.title}<h3>
    <p class="show-date">${result.date}</p>`
    infowindow.setContent(contentString);
  };

  return {
    init: initMap,
    createMarker: createMarker
  };

}());

//=========================================================================================================//

//---------------------------------------------Hotwire-------------------------------------------------//

//=========================================================================================================//

var HotwireApi = (function(options){

  var shared = {};
  var options = options || {};
     
  function setupListeners() {
    setupSearch();
  }

  function setupSearch(){
    var url = 'http://api.hotwire.com/v1/tripstarterl/hotel?apikey=n9ktvyrgwumm63b5ddrkc98w';

      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
      })
      .done(function(data) {
        console.log("success", data);
      })      
  }

  var init = function() {
    setupListeners();
  };
  shared.init = init;

  return shared;


}());
HotwireApi.init();




