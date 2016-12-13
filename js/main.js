//=========================================================================================================//

//---------------------------------------------Google Maps-------------------------------------------------//

//=========================================================================================================//

var GoogleMapApi = (function(options) {

    var map, infoWindow;
    var markers = [];

    function initMap() {
        var centerPoint = {
            lat: 32.0929887,
            lng: 20.0037614
        };

        infowindow = new google.maps.InfoWindow();
        map = new google.maps.Map(document.getElementById('map'), {
            center: centerPoint,
            zoom: 2,
            styles:[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8ec3b9"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1a3646"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#64779e"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#4b6878"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#334e87"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6f9ba5"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3C7680"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#304a7d"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2c6675"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#255763"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#b0d5ce"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#023e58"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#98a5be"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1d2c4d"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#283d6a"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3a4762"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#5271bc"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#4e6d70"
      }
    ]
  }
]
        });

      
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
        if (info.other) contentString += `<div class="other">${info.description}</div>`;

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
                '<div>'+artist+' is playing these dates! Click map icons for more info.</div></br><img class="metal" src="assets/img/metal.png">')

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
                    other: "assets/img/hotel.png",
                    description:"Hotels nearby",
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
