var yelpApi = {
   getInfo: function(loc){
    var info;
        var auth = {
            //
            // Update with your auth tokens.
            //
            consumerKey: "ko6gSNprh3xFbLpqEWnEgw",
            consumerSecret: "hFw66N1GfCev6_gZh4vy3vVtNuE",
            accessToken: "tSQgowGrM-GatDfYZU9BwTGc7phYhZ1B",
            // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
            // You wouldn't actually want to expose your access token secret like this in a real application.
            accessTokenSecret: "8-v7BeJStmPjiGUKQCdSqtoe81E",
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };
        var place=loc.location;
        var terms = loc.name;
        var near = place.city+'+'+place.state+'+'+place.zip;
        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };
        parameters = [];
        parameters.push(['term', terms]);
        parameters.push(['location', near]);
        parameters.push(['cll', loc.lat+','+loc.lng]);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
        var message = {
            'action': 'http://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };
        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);
        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);
        console.log(parameterMap);
        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data, textStats, XMLHttpRequest) {
                console.log(data);
                updateInfo(data);
            }
        });

    }
};
