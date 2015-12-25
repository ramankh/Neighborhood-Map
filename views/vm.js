var map;

function appViewModel() {
    var self = this;
    self.locations = ko.observableArray([{
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
    }]);

    self.itemClicked = function(loc) {
        bounceMarker(loc.name);
        self.updateFoursquare(loc)
    }



    self.tempList = ko.observableArray();
    self.tempList(self.locations.slice(0));
    self.searchValue = ko.observable("");

    self.fourSquars = ko.observableArray();
    self.toShowPlaces = ko.observableArray();
    self.sliceIndex = 0;

    self.nextPage = function() {
        var endIndex = self.sliceIndex + 5;
        if (self.sliceIndex < self.fourSquars().length) {
            console.log(self.fourSquars().length);
            self.toShowPlaces.removeAll();
            self.toShowPlaces(self.fourSquars.slice(self.sliceIndex, endIndex));
            console.log(self.fourSquars().length);
            self.sliceIndex += 5;
        }
    }

    self.prevPage = function() {
        var endIndex = self.sliceIndex - 5;
        if (endIndex > 0) {
            console.log(self.fourSquars().length);
            self.toShowPlaces.removeAll();
            self.toShowPlaces(self.fourSquars.slice(endIndex - 5, endIndex));
            console.log(self.fourSquars().length);
            self.sliceIndex -= 5;
        }
    }

    self.updateFoursquare = function(loc) {
        $.ajax({
            url: "https://api.foursquare.com/v2/venues/search?client_id=WXSF2KWXV4WMJJV0EF2OM0EX431QQHTUEP5FUIH3WANZIBCG" +
                "&client_secret=VVUV2J2WASJYGRWELXTBM5TO3ZB3ZELUPPLRMD2XSAUKDO54&v=20130815&ll=" + loc.lat + "," + loc.lng +
                "&query=" + loc.name,
            dataType: "json",
            success: function(data) {
                //Empty fourSquare array to push new data
                console.log(data);
                self.fourSquars.removeAll();
                for (var i = 0; i < data.response.venues.length; i++) {
                    var place = {
                        name: data.response.venues[i].name,
                        address: data.response.venues[i].location.address || ""
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
            }
        });
    }

    self.searchValue.subscribe(function(newValue) {
        self.tempList.removeAll();
        self.sendList = [];
        for (var i = 0; i < self.locations().length; i++) {
            var temp = self.locations()[i].name.substring(0, newValue.length).toUpperCase();
            var search = newValue.toUpperCase();
            if (temp === search) {
                self.tempList.push(self.locations()[i]);
                self.sendList.push(self.locations()[i]);
                console.log(self.locations()[i].name);
            }
        }
        updateMap(self.sendList);
    });
}

ko.applyBindings(new appViewModel());
