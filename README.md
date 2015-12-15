# JavaScript Guidestar API for node.js #

A node.js module, which provides an object oriented wrapper for the Guidestar REST API.

## Installation ##

   Install with the node package manager [npm](http:npmjs.org):

     $ npm install guidestar

## Example ##

Perform charity check

     GuidestarApi = require('guidestar').GuidestarApi;

     var guidestar = new GuidestarApi(config.user, config.password, '1');
     guidestar.check(ein, function(error, org) {
         console.log('509a Status: ' + org.foundation_509a_status);
     });

Currently there is no explicit login call necessary as each API call uses Basic Authentication to authenticate.

## Options ##

GuidestarApi options:
 *  `user<string>`: The username to log in with
 *  `password<string>`: Keep it secret, keep it safe
 *  `Guidestar API Version<string>`: Known to work with `1`
 *  `verbose<bool>`: Log some info to the console, usually for debugging
 
## TODO ##

 *  Other API endpoints other than [charity check](https://data.guidestar.org/#guidestar_charitycheck)