var map;
var marker;
var infoWindow;
var markers = [];
var foursquare = {};


function initMap() {
    var locations = [{
        lat: 37.338208,
        lng: -121.886329,
        name: "Down Town San Jose"
    }, {
        lat: 37.396869,
        lng: -121.802276,
        name: "Alum Rock Park"
    }, {
        lat: 37.327364,
        lng: -121.858972,
        name: "Happy Hollow Park"
    }, {
        lat: 37.240468,
        lng: -121.873784,
        name: "Almaden Lake Park"
    }, {
        lat: 37.403154,
        lng: -121.969836,
        name: "Levi's Stadium"
    }, {
        lat: 37.319969,
        lng: -121.858696,
        name: "San Jose History Park"
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

    infoWindow = new google.maps.InfoWindow({
    });

    for (var i = 0; i < locations.length; i++) {
        markers.push(new google.maps.Marker({
            position: locations[i],
            map: map,
            title: locations[i].name,
            animation: null
        }));
        markers[i].addListener('click', (function(mkr, loc){
            var currentMark = mkr;
            var thisLocation = loc;
            return function(){
                infoWindow.setContent("<div class='infoWin'><h2>"+loc.name+"</div>");
                infoWindow.open(map, currentMark);
            }
        })(markers[i], locations[i]));
    }
}

function openInfo(mkr){
  //  infoWindow.open(map, mkr);
}
/**
 * This function is called when an item in list is clicked
 * @param  {JSON} name contains clicked item info
 */
function bounceMarker(name){
    for (var i = 0; i < markers.length; i++) {
        if(markers[i].title == name){
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
        setTimeout(function(){
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