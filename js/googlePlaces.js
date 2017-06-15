

//=========================================================================================================//

//---------------------------------------------Google Places-------------------------------------------//

//=========================================================================================================//

var GooglePlaces = (function() {

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

           

                GoogleMap.createMarker({
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
