var PORT_NUMBER = 51657;

var http = require("http"),
	url = require("url");

var router = require("./routes/router");
	
var	server = http.createServer(function(request, response) {
		try {
			router(request, response);
		}
		catch (error) {
			if (error instanceof URIError) {
				response.writeHead(404, {'Content-Type': 'text/plain'});
			}
			else {
				response.writeHead(500, {'Content-Type': 'text/plain'});
			}
			response.end(error.message);
		}
	});

server.listen(PORT_NUMBER, function() {
	console.log("Listening on port " + PORT_NUMBER.toString() + "...");
});