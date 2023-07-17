// Create web server
// Start server: node comments.js
// Test: curl http://localhost:3000/comments

// Load the http module to create an http server.
var http = require('http');

// Load the url module to parse url parameters
var url = require('url');

// Load the fs module to read and write files
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {

  // Get the url parameters
  var url_parts = url.parse(request.url, true);
  var query = url_parts.query;

  // Log the parameters
  console.log('query = ' + JSON.stringify(query));

  // Set the content type
  response.writeHead(200, {'Content-Type': 'text/plain'});

  // Check if the comment parameter exists
  if (query.comment) {

    // Log the comment
    console.log('comment = ' + query.comment);

    // Write the comment to a file
    fs.appendFile('comments.txt', query.comment + '\n', function (err) {
      if (err) throw err;
      console.log('It\'s saved!');
    });

    // Send a response
    response.end('Comment received\n');
  }
  else {
    // Send a response
    response.end('No comment received\n');
  }
});

// Listen on port 3000, IP defaults to