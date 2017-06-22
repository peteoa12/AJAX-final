
//=========================================================================================================//
//----------------------------------------------Bands In Town API------------------------------------------//
//=========================================================================================================//
var BandsApi = (function(options) {

    var shared = {};
    var options = options || {};

    function setupListeners() {
        setupSearch();
        zoomToMapMarker();
    }

    function setupSearch(data) {
        $('form[name=search] button').click(function() {
            scroll();
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

    function scroll(){
        console.log('I was scrolled');
        $(window).scrollTo('.map_container');
    }

    function errorHandeling(data, artist) {
        $('#errors').empty();
        if (data.hasOwnProperty("errors")) {
            $('.results').empty();
            $("#errors").append(
                '<div>Never heard of '+artist+' before!</div>')

        } else if (Array.isArray(data) && !data.length) {
            $('.results').empty();
            $("#errors").append(
                '<div>Sorry, there are no events for '+artist+'.</div>')

        } else if (Array.isArray(data) && data.length) {
            $('.results').empty();
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

    function displayDates(data, r) {
        $('.results').empty();
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
                    link_img: "assets/img/ticket-icon.svg",
                    other: "assets/img/hotel.png",
                    description:"Hotels nearby",
                });
            }

            createListItem(r);

        }
    }

    function createListItem(r) {

        var $newItem = $(`<li class="list-item">
             <h2 class="city">${r.venue.city}, ${r.venue.country}</h2>
             <div class="list-wrapper">
                 <div class="list venue">${r.venue.name}</div>
                 <div class="list date">${moment(r.datetime).format("dddd, MMMM Do YYYY, h:mm a")}</div>
                 <a class="list-icons tickets" href="${r.ticket_url}" target="_blank" class="link">
                    <img src="assets/img/ticket-icon.svg"></br>
                    <span>Get Tickets</span>
                 </a>
                 <div class="list-icons hotels">
                    <img src="assets/img/hotel-icon.svg"></br>
                    <span>Find Hotels</span>
                 </div>
             </div>
        </li>`);

        $('.results').append($newItem);

        $newItem.find(".hotels").on("click", function() {
            // console.log("hotel button clicked", r);

            
            GooglePlaces.search({
                latitude: r.venue.latitude,
                longitude: r.venue.longitude
            });


            GoogleMapApi.getMap().setZoom(15);
            GoogleMapApi.getMap().panTo({
                lat: r.venue.latitude,
                lng: r.venue.longitude
            });
        })
    }

   
    function zoomToMapMarker(){
        $("body").on('click', '.hotels', function(event) {
                 console.log()
        });
    }




    var init = function() {
        setupListeners();
    };
    shared.init = init;

    return shared;


}());
BandsApi.init();