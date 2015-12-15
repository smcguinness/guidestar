// # JavaScript Guidestar API for node.js #
//
// A node.js module, which provides an object oriented wrapper for the Guidestar REST API.
//
// ## Installation ##
//
//   Install with the node package manager [npm](http://npmjs.org):
//
//     $ npm install guidestar
//
// ## Example ##
//
// Perform charity check
//
//     GuidestarApi = require('guidestar').GuidestarApi;
//
//     var guidestar = new GuidestarApi(config.user, config.password, '1');
//     guidestar.check(ein, function(error, org) {
//         console.log('509a Status: ' + org.foundation_509a_status);
//     });
//
// Currently there is no explicit login call necessary as each API call uses Basic Authentication to authenticate.
//
// ## Options ##
//
// GuidestarApi options:
// *  `user<string>`: The username to log in with
// *  `password<string>`: Keep it secret, keep it safe
// *  `Guidestar API Version<string>`: Known to work with `1`
// *  `verbose<bool>`: Log some info to the console, usually for debugging
//

var logger = console;


var GuidestarApi = exports.GuidestarApi = function(username, password, apiVersion, verbose) {
    this.username = username;
    this.password = password;
    this.apiVersion = apiVersion;
    
    // This is so we can fake during unit tests
    this.request = require('request');
    if (verbose !== true) { logger = { log: function() {} }; }

    this.makeUri = function(pathname) {
        
        return decodeURIComponent("https://data.guidestar.org/v" + this.apiVersion + pathname + ".json");
        
    };

    this.doRequest = function(options, callback) {
        if(this.username && this.password) {
          options.auth = {
            'user': this.username,
            'pass': this.password
          };
        }
        this.request(options, callback);
    };

};

(function() {
    // ## Charity Check ##
    // ### Takes ###
    //
    // *  ein: tax ein for org
    // *  callback: for when it's done
    //
    // ### Returns ###
    //
    // *  error: string of the error
    // *  issue: an object of the issue
    //
    this.check = function(ein, callback) {

        var options = {
            uri: this.makeUri('/charitycheck/' + ein),
            method: 'GET'
        };

        this.doRequest(options, function(error, response, body) {

            if (error) {
                callback(error, null);
                return;
            }

            if (response.statusCode === 404) {
                callback('Invalid ein.');
                return;
            }

            if (response.statusCode !== 200) {
                callback(response.statusCode + ': Unable to connect to Guidestar during charity check.');
                return;
            }

            if (body === undefined) {
                callback('Response body was undefined.');
                return;
            }

            callback(null, JSON.parse(body));

        });
    };

}).call(GuidestarApi.prototype);