/**
 * app view model using knockout.js
 */
var map;

function appViewModel() {
    var self = this;
    /**
     * fetch data from model
     */
    self.locations = ko.observableArray(model.getData());
    /**
     * handels marker bouncing and updates
     * suggested places
     * @param  {Object} loc selected location
     */
    self.itemClicked = function(loc) {
        bounceMarker(loc.name);
        showInfoWin(loc.name);
        self.updateFoursquare(loc);
    };
    /**
     * tempList is an array which stores all filtered
     * locations to be shown on map so in index.html foreach
     * is bound to this array rather than locations. The initial
     * value of tempList is all items in locations.
     * @type {ko.observableArray}
     */
    self.tempList = ko.observableArray();
    self.tempList(self.locations.slice(0));
    /**
     * search value is contains search input element
     * @type {ko.observable}
     */
    self.searchValue = ko.observable("");
    /**
     * fourSquars contains all recommended place
     * from fourSquar API
     * toShowPlaces contains all places to be shown
     * in each page
     * @type {ko.observableArray}
     */
    self.fourSquars = ko.observableArray();
    self.toShowPlaces = ko.observableArray();
    /**
     * sliceIndex is the index from which fourSqures
     * should be sliced into toShowPlaces
     * @type {Number}
     */
    self.sliceIndex = 0;
    /**
     * nextPage function loads next 5 places of fourSquare array
     * into suggested panel. toShowPlaces contains all elements from slice
     * index to endIndex.
     */
    self.nextPage = function() {
        var endIndex = self.sliceIndex + 5;
        if (self.sliceIndex < self.fourSquars().length) {
            self.toShowPlaces.removeAll();
            self.toShowPlaces(self.fourSquars.slice(self.sliceIndex, endIndex));
            self.sliceIndex += 5;
        }
    };
    /**
     * prevPage function loads previous 5 places of fourSquare array
     * into suggested panel. In this case sliceIndex is the endpoint.
     */
    self.prevPage = function() {
        var endIndex = self.sliceIndex - 5;
        if (endIndex > 0) {
            self.toShowPlaces.removeAll();
            self.toShowPlaces(self.fourSquars.slice(endIndex - 5, endIndex));
            self.sliceIndex -= 5;
        }
    };
    /**
     * retrieves data from updateFourSqures api
     * @param  {Object} loc represents the locations clicked in list view
     */
    self.updateFoursquare = function(loc) {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/search?client_id=WXSF2KWXV4WMJJV0EF2OM0EX431QQHTUEP5FUIH3WANZIBCG" +
                "&client_secret=VVUV2J2WASJYGRWELXTBM5TO3ZB3ZELUPPLRMD2XSAUKDO54&v=20130815&ll=" + loc.lat + "," + loc.lng +
                "&query=" + loc.name,
            dataType: "json",
            success: function(data) {
                //Empty fourSquare array to push new data
                self.fourSquars.removeAll();
                var urlPrefix = "https://foursquare.com/v/";
                $(".panel-body").append("<div class='errorPanel'><h3>oops! Sorry please try later</h3></div>");
                $(".errorPanel").remove();
                for (var i = 0; i < data.response.venues.length; i++) {
                    var venue = data.response.venues[i];
                    var urlName = venue.name.replace(/ /g, "-");
                    var url = urlPrefix + urlName + "/" + venue.id;
                    var place = {
                        name: venue.name,
                        address: venue.location.address || "",
                        url: url
                    };
                    //push each retrieved place to fourSquars
                    self.fourSquars.push(place);
                }
                //reset slice index
                self.sliceIndex = 0;
                //put only five entity to be shown at recommended part
                self.toShowPlaces(self.fourSquars.slice(self.sliceIndex, 5));
                //shift slice index 5 times to right
                self.sliceIndex += 5;
            },
            error: function(e) {
                console.log(e);

                if (!($(".errorPanel").length)) {
                    $(".panel-body").append("<div class='errorPanel'><h3>oops! Sorry please try later</h3></div>");
                }
            }
        });
    };
    /**
     * subscribes a listener to search input value change
     *
     */
    self.searchValue.subscribe(function(newValue) {
        self.tempList.removeAll(); // empty tempList which contains filtered locations
        self.sendList = []; //using JS array to update markers in map
        for (var i = 0; i < self.locations().length; i++) {
            //convert all letters to upper case since search is not case sensitive
            var temp = self.locations()[i].name.substring(0, newValue.length).toUpperCase();
            var search = newValue.toUpperCase();
            if (temp === search) {
                self.tempList.push(self.locations()[i]);
                self.sendList.push(self.locations()[i]);
            }
        }
        updateMap(self.sendList);
    });
}
ko.applyBindings(new appViewModel());
