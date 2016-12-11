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
        markers.push(marker);
    };


    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

    function createInfoWindow(result, marker) {
        var contentString = `<h3 class="marker-title">Venue: ${result.title}<h3>
    <p class="show-date">${result.date}</p><a href="${result.tickets}" target="_blank" class="tickets"><img src="assets/img/movie-tickets.png" alt="tickets"></a>`
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
                    // console.log(data);
                    errorHandeling(data, artist);
                });

            return false;
        });
    }

    function errorHandeling(data, artist) {
        $('#errors').empty();
        if (data.hasOwnProperty("errors")) {
            $("#errors").append(
                '<div>Never heard of them before!</div>')

        } else if (Array.isArray(data) && !data.length) {
            $("#errors").append(
                '<div>Sorry, there are no events for this artist.</div>')

        } else if (Array.isArray(data) && data.length) {
            GoogleMapApi.deleteMarkers();
            displayDates(data);
            $("#errors").append(
                '<div>Here you go!</div>')

        } else if (typeof data == "object" && data.mbid == null) {
            $("#errors").append(
                '<div>No artist specified.</div>')

        } else {
            $("#errors").append(
                '<div>Unknown error.</div>')
        }
    }

    function displayDates(data, result, $results) {
        for (var i = 0; i < data.length; i++) {
            var r = data[i];
            // console.log(r);

            if (r.venue) {

                GoogleMapApi.createMarker({
                    geometry: {
                        location: {
                            lng: r.venue.longitude,
                            lat: r.venue.latitude
                        }
                    },
                    title: r.venue.name,
                    url: r.url,
                    date: new Date(r.datetime),
                    tickets: r.ticket_url
                });

            }

            // $('.results').append('');
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
            })
            .done(function(data) {
                // console.log("success", data);
                displayPins(data);
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown)
            })
    }

    function displayPins(data) {
        for (var i = 0; i < data.results.length; i++) {
            var r = data.results[i];
            console.log(r);

            GoogleMapApi.createMarker({
                geometry: {
                    location: {
                        lng: r.geometry.location.lng,
                        lat: r.geometry.location.lat
                    }
                },
                title: r.name
            });
        }
    }

    shared.search = search;

    return shared;


}());
