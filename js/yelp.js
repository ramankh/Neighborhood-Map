/**
 * This file contains all yelp related codes including authentications and
 * ajax call to retrieve data ralated to each selected place.
 * @type {Object}
 */
var yelpApi = {
    /**
     * Get data from yelp based on passed location
     * @param  {Object} loc delected location
     */
   getInfo: function(loc){
    var info;
        var auth = {
            // auth tokens
            consumerKey: "ko6gSNprh3xFbLpqEWnEgw",
            consumerSecret: "hFw66N1GfCev6_gZh4vy3vVtNuE",
            accessToken: "tSQgowGrM-GatDfYZU9BwTGc7phYhZ1B",
            accessTokenSecret: "8-v7BeJStmPjiGUKQCdSqtoe81E",
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };
        //put location info in a new variable
        var place=loc.location;
        //put location name in a new variable
        var terms = loc.name;
        //where should yelp api look for above term
        var near = place.city+'+'+place.state+'+'+place.zip;
        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };
        //all parameters which will pass to ajax call
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
        /**
         * Ajax call to yelp api
         */
        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data, textStats, XMLHttpRequest) {
                //call updateInfo if data fetched succesfully
                updateInfo(data);
            },
            error: function(e){
                //call badInfo if data fetched with error
                badInfo();
            }

        });

    }
};
