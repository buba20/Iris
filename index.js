var PORT_NUMBER = 51657,
	MSG_ROUTE_PUBLIC = "This area is public and you're most welcome here :)";
	MSG_ROUTE_PRIVATE = "This is a private area, get outta here!";
	MSG_ROUTE_MAIN = "Welcome to main page. Have you tried other locations, like /public and /private ?";
	MSG_ROUTE_UNKNOWN = "Page not found, sorry.";
	
var http = require("http"),
	url = require("url");
	
var routes = {
		"/": function() {
			return MSG_ROUTE_MAIN;
		},
		"/public": function() {
			return MSG_ROUTE_PUBLIC;
		},
		"/private": function() {
			return MSG_ROUTE_PRIVATE;
		}
	}
	server = http.createServer(function(request, response) {
		var parsedUrl = url.parse(request.url, true),
			responseFunction = routes["" + parsedUrl.pathname];
		console.log("Handling request for " + parsedUrl.pathname);
		if (responseFunction) {
			response.end(responseFunction());
		}
		else {
			response.end(MSG_ROUTE_UNKNOWN);
		}
	});

server.listen(PORT_NUMBER, function() {
	console.log("Listening on port " + PORT_NUMBER.toString() + "...");
});