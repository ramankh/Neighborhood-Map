var map;
var marker;
var markers = [];

function initMap() {
    var locations = [{
        lat: 37.338208,
        lng: -121.886329,
        name: "San Jose City"
    }, {
        lat: 37.396869,
        lng: -121.802276,
        name: "Alum Rock Park"
    }, {
        lat: 37.327364,
        lng: -121.858972,
        name: "Happy Hollow Park"
    }];

    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0],
        zoom: 11
    });


    for (var i = 0; i < locations.length; i++) {
        markers.push(new google.maps.Marker({
            position: locations[i],
            map: map,
            title: locations[i].name,
            animation: google.maps.Animation.DROP
        }));
    }


    //marker.addListener("click", toggleBounce);

    $.ajax({
        url: "https://api.foursquare.com/v2/venues/search?client_id=WXSF2KWXV4WMJJV0EF2OM0EX431QQHTUEP5FUIH3WANZIBCG" +
            "&client_secret=VVUV2J2WASJYGRWELXTBM5TO3ZB3ZELUPPLRMD2XSAUKDO54&v=20130815&ll=40.7,-74" +
            "&query=sushi",
        dataType: "json",
        success: function(data) {
            console.log(data);
        },
        error: function(e) {
            console.log(e);
        }
    });


}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}
