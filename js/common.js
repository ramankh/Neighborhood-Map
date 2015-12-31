/**
 * all map related codes are here: markers update, infoWindow ...
 */
var map;
var marker;
var infoWindow;
var markers = [];
var foursquare = {};
var locations;

function initMap() {

    locations = model.getData();
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
    /**
     * set map center to default when closing info window
     */
    map.addListener('click', function() {
        infoWindow.close();
        map.setCenter(locations[0]);
    });

    /**
     * add click event on full screen button and set center to default
     */
    $('.fullscreen').click(function() {
        $(".mapContainer").toggleClass("expand-map");
        //let map knows that it should fit to new map size
        google.maps.event.trigger(map, "resize");
        map.setCenter(locations[0]);
    });
/**
 * create markers and push theme to markers array
 */
    for (var i = 0; i < locations.length; i++) {
        markers.push(new google.maps.Marker({
            position: locations[i],
            map: map,
            title: locations[i].name,
            animation: null,
        }));
        /**
         * add click event to markers using yelp api to fetch
         * info about the marker location
         */
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

/**
 * set contetn of infoWindow based on info fetch from yelp api
 * @param  {Object} info object returned from yelp api
 */
function updateInfo(info) {
    var information = info.businesses[0];
    infoWindow.setContent("<div class='info-Win'><div class='infoWin-info'><div class='infoWin-content'>"+
        "<h4>"+information.name+"</h5>"+
        "<h5>"+information.location.address+"</h5>"+
        "<h5>"+information.location.city+', '+information.location.state_code+
        ' '+information.location.postal_code+"</h5>"+
        "<h6>"+information.display_phone+"</h6></div>"+ //end of content
        "<div class=infoWin-img><img src='"+information.image_url+"'></div></div>"+ //end of info-img and infoWin
        "<div class='info-yelp'><img src='images/yelp-logo-xsmall.png'>"+
        "<a href='"+information.url+"'><h6>Read more at Yelp</h6></a>"+
        "<div class='yelp-score'><h4>"+information.rating+"/5</h4></div></div></div>"); //end of info-snippet & infoWin
}

function badInfo() {
    infoWindow.setContent("<div class='errorInfo'><h3>oops! Try again</h3></div>");
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
        }, 750); // each bounce cycle is 750 milliseconds
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

/**
 * Shows any markers currently in the array.
 * @param  {Array} collection set of markers
 */
function showMarkers(collection) {
    for (var i = 0; i < markers.length; i++) {
        for (var j = 0; j < collection.length; j++) {
            if (collection[j].name == markers[i].title) {
                markers[i].setMap(map);
            }
        }
    }
}

/**
 * sets all markers on map
 * @param {[type]} map [description]
 */
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

/**
 * Removes the markers from the map, but keeps them in the array.
 */
function clearMarkers() {
    setMapOnAll(null);
}