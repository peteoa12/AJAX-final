
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

            $('.results').append(
                `<li>
                     <h2 class="city">${r.venue.city}</h2>
                     <div class="list venue">${r.venue.name}</div>
                     <div class="list date">${r.datetime}</div>
                     <a class="list tickets" href="${r.ticket_url}" target="_blank" class="link">
                        <img src="assets/img/movie-tickets.png">
                     </a>
                     <a class="list hotels" href="#hotels">Find Hotels</a>
                </li>`
            );
        }
    }





    var init = function() {
        setupListeners();
    };
    shared.init = init;

    return shared;


}());
BandsApi.init();