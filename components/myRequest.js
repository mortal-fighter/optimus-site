'use strict';

/*
	myRequest provides primisified versions of http(s).request
*/

const https = require('https');
const Promise = require('bluebird');

module.exports = {
	httpsRequestAsync: Promise.method(function(options) {
	    return new Promise(function(resolve, reject) { 
	        var request = https.request(options, function(response) {
	            // Bundle the result
	            var result = {
	                'httpVersion': response.httpVersion,
	                'httpStatusCode': response.statusCode,
	                'headers': response.headers,
	                'body': '',
	                'trailers': response.trailers
	            };

	            // Build the body
	            response.on('data', function(chunk) {
	                result.body += chunk;
	            });

	            // Resolve the promise
	            response.on('end', () => {
					resolve(result);
				});
	        });

	        // Handle errors
	        request.on('error', function(error) {
	            console.log('Problem with request:', error.message);
	            reject(error);
	        });

	        // Must always call .end() even if there is no data being written to the request body
	        request.end();
	    });
	}) 
};