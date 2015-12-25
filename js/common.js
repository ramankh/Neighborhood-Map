var map;
var marker;
var infoWindow;
var markers = [];
var foursquare = {};


function initMap() {
    var locations = [{
        lat: 37.338052,
        lng: -121.901239,
        name: "SAP Center",
        location: {
            address: "525 W Santa Clara St",
            city: "San Jose",
            state: "CA",
            zip: "95113"
        }
    }, {
        lat: 37.396869,
        lng: -121.802276,
        name: "Alum Rock Park",
        location: {
            address: "15350 Penitencia Creek Rd",
            city: "San Jose",
            state: "CA",
            zip: "95127"
        }
    }, {
        lat: 37.327364,
        lng: -121.858972,
        name: "Happy Hollow Park",
        location: {
            address: "1300 Senter Rd",
            city: "San Jose",
            state: "CA",
            zip: "95112"
        }
    }, {
        lat: 37.240468,
        lng: -121.873784,
        name: "Almaden Lake Park",
        location: {
            address: "15652 Almaden Expy",
            city: "San Jose",
            state: "CA",
            zip: "95120"
        }
    }, {
        lat: 37.403154,
        lng: -121.969836,
        name: "Levi's Stadium",
        location: {
            address: "4900 Marie P DeBartolo Way",
            city: "Santa Clara",
            state: "CA",
            zip: "95054"
        }
    }, {
        lat: 37.319969,
        lng: -121.858696,
        name: "San Jose History Park",
        location: {
            address: " 1650 Senter Rd",
            city: "San Jose",
            state: "CA",
            zip: "95112"
        }
    }];
    /**
     * When using mobile devices with google map scrolling is annoying when
     * map is draggable. So this line checks if touching is avaialbe then
     * disable draggable in map options!
     * @todo check if the device is tablet since this problem wont be in large
     * screens like tablet
     * @type {Boolean}
     */
    var isDraggable = !('ontouchstart' in document.documentElement);
    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0],
        zoom: 10,
        draggable: isDraggable
            //panControl: true // prevent mobile users to loose the location due touching the screen
    });

    /**
     * google map Info Window
     * @type {google}
     */
    infoWindow = new google.maps.InfoWindow({});
    /**
     * reset map center for beter UX
     * @param  {string}) event of closing the info window
     * @param {function}   call back function when close click event raised
     */
    google.maps.event.addListener(infoWindow, 'closeclick', function() {
        map.setCenter(locations[0]);
    });
    map.addListener('click', function() {
        infoWindow.close();
        map.setCenter(locations[0]);


    });

    $('.fullscreen').click(function() {
        $(".mapContainer").toggleClass("expand-map");
        google.maps.event.trigger(map, 'resize');
        map.setCenter(locations[0]);
    });

    for (var i = 0; i < locations.length; i++) {
        markers.push(new google.maps.Marker({
            position: locations[i],
            map: map,
            title: locations[i].name,
            animation: null
        }));
        markers[i].addListener('click', (function(mkr, loc) {
            var currentMark = mkr;
            var thisLocation = loc;
            return function() {
                var info = yelpApi.getInfo(thisLocation);
                infoWindow.open(map, currentMark);
            }
        })(markers[i], locations[i]));
    }
}

function updateInfo(info) {
    //  infoWindow.open(map, mkr);
    infoWindow.setContent("<div class='info-Win'><div class='infoWin-info'><div class='infoWin-content'>"+
        "<h4>"+info.businesses[0].name+"</h5>"+
        "<h5>"+info.businesses[0].location.address+"</h5>"+
        "<h5>"+info.businesses[0].location.city+', '+info.businesses[0].location.state_code+
        ' '+info.businesses[0].location.postal_code+"</h5>"+
        "<h6>"+info.businesses[0].display_phone+"</h6></div>"+ //end of content
        "<div class=infoWin-img><img src='"+info.businesses[0].image_url+"'></div></div>"+ //end of info-img and infoWin
        "<div class='info-yelp'><img src='images/yelp-logo-xsmall.png'>"+
        "<a href='"+info.businesses[0].url+"'><h6>Read more at Yelp</h6></a>"+
        "<div class='yelp-score'><h4>"+info.businesses[0].rating+"/5</h4></div></div></div>"); //end of info-snippet & infoWin
}
/**
 * This function is called when an item in list is clicked
 * @param  {JSON} name contains clicked item info
 */
function bounceMarker(name) {
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].title == name) {
            toggleBounce(markers[i]);
        }
    }
}

/**
 * This fnction bounce the marker if it is not already bounced
 * @param  {google.marker} mkr current marker
 */
function toggleBounce(mkr) {
    if (mkr.getAnimation() !== null) {
        mkr.setAnimation(null);
    } else {
        mkr.setAnimation(google.maps.Animation.BOUNCE);
        //set marker animation to null after one bounce cycle
        setTimeout(function() {
            mkr.setAnimation(null);
        }, 1500); // each bounce cycle is 750 milliseconds
    }
}

/**
 * updates map markers
 * @param  {Array} collection list of all filtered markers
 */
function updateMap(collection) {
    clearMarkers();
    showMarkers(collection);
}

// Shows any markers currently in the array.
function showMarkers(collection) {
    for (var i = 0; i < markers.length; i++) {
        for (var j = 0; j < collection.length; j++) {
            if (collection[j].name == markers[i].title) {
                markers[i].setMap(map);
            }
        }
    }
}

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