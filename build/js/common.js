/*! Neighborhood-Map2015-12-30 Author: Raman Khenanisho*/
function initMap(){locations=model.getData();var a=!("ontouchstart"in document.documentElement);map=new google.maps.Map(document.getElementById("map"),{center:locations[0],zoom:10,draggable:a}),infoWindow=new google.maps.InfoWindow({}),google.maps.event.addListener(infoWindow,"closeclick",function(){map.setCenter(locations[0])}),map.addListener("click",function(){infoWindow.close(),map.setCenter(locations[0])}),$(".fullscreen").click(function(){$(".mapContainer").toggleClass("expand-map"),google.maps.event.trigger(map,"resize"),map.setCenter(locations[0])});for(var b=0;b<locations.length;b++)markers.push(new google.maps.Marker({position:locations[b],map:map,title:locations[b].name,animation:null})),markers[b].addListener("click",function(a,b){var c=a,d=b;return function(){yelpApi.getInfo(d);infoWindow.open(map,c)}}(markers[b],locations[b]))}function updateInfo(a){var b=a.businesses[0];infoWindow.setContent("<div class='info-Win'><div class='infoWin-info'><div class='infoWin-content'><h4>"+b.name+"</h5><h5>"+b.location.address+"</h5><h5>"+b.location.city+", "+b.location.state_code+" "+b.location.postal_code+"</h5><h6>"+b.display_phone+"</h6></div><div class=infoWin-img><img src='"+b.image_url+"'></div></div><div class='info-yelp'><img src='images/yelp-logo-xsmall.png'><a href='"+b.url+"'><h6>Read more at Yelp</h6></a><div class='yelp-score'><h4>"+b.rating+"/5</h4></div></div></div>")}function badInfo(){infoWindow.setContent("<div class='errorInfo'><h3>oops! Try again</h3></div>")}function bounceMarker(a){for(var b=0;b<markers.length;b++)markers[b].title==a&&toggleBounce(markers[b])}function toggleBounce(a){null!==a.getAnimation()?a.setAnimation(null):(a.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){a.setAnimation(null)},750))}function updateMap(a){clearMarkers(),showMarkers(a)}function showMarkers(a){for(var b=0;b<markers.length;b++)for(var c=0;c<a.length;c++)a[c].name==markers[b].title&&markers[b].setMap(map)}function setMapOnAll(a){for(var b=0;b<markers.length;b++)markers[b].setMap(a)}function clearMarkers(){setMapOnAll(null)}var map,marker,infoWindow,markers=[],foursquare={},locations;