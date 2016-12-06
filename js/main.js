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
          console.log(data);

          if(data.hasOwnProperty("errors")) {
            $("body").append(
             '<div>Never heard of them before!</div>')

          } else if(Array.isArray(data) && !data.length) {
             $("body").append(
              '<div>Sorry, there are no dates for this artist!</div>')

          } else if(Array.isArray(data) && data.length) {
            displayDates(data);
            $("body").append(
              '<div>Here you go!</div>')

          } else if(typeof data == "object" && data.mbid == null ){
            $("body").append(
              '<div>No artist specified.</div>')

          } else {
            $("body").append(
              '<div>Unknown error.</div>')
          }
          


        });

        return false;
    });
  }

  function errorHandeling(data, artist) {

  }

   function displayDates(data, result,$results) {

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
            date:new Date(r.datetime),
            tickets:r.ticket_url
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

        GooglePlacesApi.search({
           latitude: result.geometry.location.lat,
           longitude: result.geometry.location.lng
        });

        createInfoWindow(result, marker);
        infowindow.open(map, this);
    });
  };

  function createInfoWindow(result, marker) {
    var contentString = `<h3 class="marker-title">Venue: ${result.title}<h3>
    <p class="show-date">${result.date}</p><a href="${result.tickets}" target="_blank" class="tickets"><img src="assets/img/movie-tickets.png" alt="tickets"></a>`
    infowindow.setContent(contentString);
  };

  return {
    init: initMap,
    createMarker: createMarker
  };

}());

//=========================================================================================================//

//---------------------------------------------Air BnB-------------------------------------------------//

//=========================================================================================================//

var GooglePlacesApi = (function(){
  
  var shared = {};


  function search(data){
    var latitude = data.latitude;
    var longitude = data.longitude;
    var url = "php/googlePlaces.php?location="+latitude+','+longitude+"";

      $.ajax({
        url: url,
        method: 'GET',
        dataType: 'json'
      })
      .done(function(data) {
        console.log("success", data);
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown)
      })
  }
  shared.search = search;

  return shared;


}());





