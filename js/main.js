//=========================================================================================================//

//----------------------------------------------UBER-------------------------------------------------------//

//=========================================================================================================//

var UberApi = (function(options){

  var shared = {};
  var options = options || {};
  var clientID = 'G4fQOJA6iRyCzWcqy8mFihrZK3orC7uc';
  var serverToken = 'iJT1w-2xv6937ZmlvxHq3qQpJWwNhFXG5W53xFQ2';
  var secret = 'CmvdKYiLSfT5t7LAuv9Rd0W-U7cBMy-R7FpLN8-j';
  var accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZXMiOltdLCJzdWIiOiI3NDA3ZjhkMy0xMzc1LTQ4M2UtODI3Yi01N2U4MGJmYjhkOTAiLCJpc3MiOiJ1YmVyLXVzMSIsImp0aSI6ImFiY2JjY2QxLWI3NTItNDNmNy1hZDZkLTc0MjZkYzA0YWMzZCIsImV4cCI6MTQ4MzA0NzcyMiwiaWF0IjoxNDgwNDU1NzIyLCJ1YWN0IjoiTDRpekRtTFBGMWR2c1FFVTVWTHhSZ2VoRFFmZmdWIiwibmJmIjoxNDgwNDU1NjMyLCJhdWQiOiJHNGZRT0pBNmlSeUN6V2NxeThtRmloclpLM29yQzd1YyJ9.bo4l1WfQrXZG7nxRdN5ezdsk84oVJApTzyEs_fNKIY63H79P7EU_b9neN1sPjwalDLXTQK2Zj9CMm3Gh2oXUZYLRN_Y0lqG6XoYsPvx_RCwfR8kq5RUVyLh8tcGcIqLVeciu4PAQoUp-eNzC5l-W-Utq-criAB7NKukdHnZOWB4ztMqJ4QvMQAocYnOC05D3fpcMUX3lTFmxNC24qClqao2TtbLTzTPVFRXPwEYZ8uY6g6_-XqlK-P4liK7PoJWswcwwTwPdnAE2YvXKqUT3fQs9BEESxBuo8QVN-gcULK5djwaW0t5J8GAos7ZGv_bxGakmGryt8jA9u-g1c3GLzg';
  
  var url = 'https://login.uber.com/oauth/v2/authorize?client_id='+clientID+'&response_type=code';
    
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
          type: 'GET',
          dataType: 'json',
          data: params,
        })
        .done(function(response) {
          console.log("success",response);
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
	
  var myLatLng = {lat: 33.742712, lng: -84.338520}; // initial center point of map

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



