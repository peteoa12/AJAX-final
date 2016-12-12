//=========================================================================================================//

//---------------------------------------------Google Maps-------------------------------------------------//

//=========================================================================================================//

var GoogleMapApi = (function(options) {

    var map, infoWindow;
    var markers = [];

    function initMap() {
        var centerPoint = {
            lat: 38.4394932,
            lng: -88.8991953
        };

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 3
        });

        [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#523735"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#c9b2a6"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#404c4c"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#95bbc6"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#fff3d6"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ae9e90"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f1e0b3"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#b9dbc9"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#93817c"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#a5b076"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#447530"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f1e6"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#fdfcf8"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f8c967"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#e2cb00"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#843de2"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e98d58"
              }
            ]
          },
          {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#db8555"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#896f66"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8f7d77"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#ebe3cd"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dfd2ae"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#4b95ca"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#343732"
              }
            ]
          }
        ]
    };

   
    function createMarker(result, info) {
        var marker = new google.maps.Marker({
            position: result.geometry.location,
            map: map,
            icon: result.icon,
            // title: result.name,
            animation: google.maps.Animation.DROP
        });
        
        google.maps.event.addListener(marker, 'click', function() {

            GooglePlacesApi.search({
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng
            });


            setInfoWindowContent(info);
            infowindow.open(map, this);
        });
        markers.push(marker);
    };


    
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    
    function clearMarkers() {
        setMapOnAll(null);
    }

    
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function setInfoWindowContent(info) {
        var contentString = ``;

        if (info.title) contentString += `<h3 class="marker-title">${info.title}<h3>`;
        if (info.date) contentString += `<p class="show-date">${info.date}</p>`;
        if (info.link && info.link_img) contentString += `<a href="${info.link}" target="_blank" class="link"><img src="${info.link_img}"></a>`;
        if (info.other) contentString += `<div class="other">${info.other}</div>`;

        infowindow.setContent(contentString);
    };

    return {
        init: initMap,
        setMapOnAll: setMapOnAll,
        createMarker: createMarker,
        deleteMarkers: deleteMarkers
    };

}());
//=========================================================================================================//
//----------------------------------------------Bands In Town API------------------------------------------//
//=========================================================================================================//
var BandsApi = (function(options) {

    var shared = {};
    var options = options || {};

    function setupListeners() {
        setupSearch();
    }

    function setupSearch() {
        $('form[name=search] button').click(function() {


            var $e = $(event.currentTarget),
                $form = $e.closest('form'),
                artist = $form.find('input[name=q]').val();

            $.ajax({
                url: 'http://api.bandsintown.com/artists/' + artist + '/events.json?/api_version=2.0&app_id=Gigabite',
                method: 'GET',
                dataType: 'jsonp'
            })
            .done(function(data) {
                console.log(data);
                errorHandeling(data, artist);
            });

            return false;
        });
    }

    function errorHandeling(data, artist) {
        $('#errors').empty();
        if (data.hasOwnProperty("errors")) {
            $("#errors").append(
                '<div>Never heard of '+artist+' before!</div>')

        } else if (Array.isArray(data) && !data.length) {
            $("#errors").append(
                '<div>Sorry, there are no events for '+artist+'.</div>')

        } else if (Array.isArray(data) && data.length) {
            GoogleMapApi.deleteMarkers();
            displayDates(data);
            $("#errors").append(
                '<div>'+artist+' is playing these dates! Click map icons for more info.</div>')

        } else if (typeof data == "object" && data.mbid == null) {
            $("#errors").append(
                '<div>Please enter an artist.</div>')

        } else {
            $("#errors").append(
                '<div>Unknown error.</div>')
        }
    }

    function displayDates(data, result, $results) {
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            console.log(r);

            if (r.venue) {

                GoogleMapApi.createMarker({
                    geometry: {
                        location: {
                            lng: r.venue.longitude,
                            lat: r.venue.latitude
                        }
                    }
                }, {
                    title: "Venue: " + r.venue.name,
                    date: moment(r.datetime).format("dddd, MMMM Do YYYY, h:mm a"),
                    link: r.ticket_url,
                    link_img: "assets/img/movie-tickets.png",
                    other: "Hotels Nearby"
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

//---------------------------------------------Google Places API-------------------------------------------//

//=========================================================================================================//

var GooglePlacesApi = (function() {

    var shared = {};

    function search(data) {
        var latitude = data.latitude;
        var longitude = data.longitude;
        var url = "php/googlePlaces.php?location=" + latitude + ',' + longitude + "&rankby=distance&type=lodging";

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json'
        }).done(function(data) {
            console.log("success", data);
            displayHotels(data);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown)
        })
    }

    function displayHotels(data, result, $results) {
        $('.other').click(function(event) {
            for (var i = 0; i < data.results.length; i++) {
                var r = data.results[i];
                var longitude = r.geometry.location.lng;
                var latitude = r.geometry.location.lat;
                console.log(r);
                //for every hotel you find drop a new pin.


                var image = {
                    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    // This marker is 32 pixels wide by 32 pixels high.
                    size: new google.maps.Size(32, 32),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(15, 32)
                };

           

                GoogleMapApi.createMarker({
                    geometry: {
                        location: {
                            lng: longitude,
                            lat: latitude,
                        }
                    },
                    icon:image,
                },{
                    title: "Hotel: " + r.name,
                });
             

            }
        });

    }

    shared.search = search;

    return shared;


}());
