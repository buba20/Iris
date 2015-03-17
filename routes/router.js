var MSG_ROUTE_UNKNOWN = "Route unknown.";

var url = require("url");

var controllers = {
	"": require("../controllers/main"),
	"users": require("../controllers/users")
}

module.exports = function(request, response) {
	try {
		var parsedUrl = url.parse(request.url, true),			
			controllerName = parsedUrl.pathname.split("/")[1],
			controller = controllers[controllerName],
			pathElements = parsedUrl.pathname.split("/").slice(2),
			pathString = pathElements.join("/");
		
		console.log("Controller name: " + controllerName);	
		if (controller) {
			console.log("Method: " + request.method);
			var methodHandler = controller.handlers[request.method];
			if (!methodHandler)	{
				console.log("Method handler not found");
				throw new URIError("Unsupported method: " + request.method);		
			}
			var methodHandlerRoutes = Object.keys(methodHandler),
				routeHandler;
			for (var i = 0; i < methodHandlerRoutes.length && !routeHandler; i++) {
				var regex = new RegExp(methodHandlerRoutes[i]);
				if (regex.test(pathString)) {
					routeHandler = methodHandler[methodHandlerRoutes[i]];
				}
			}
			if (!routeHandler) {	
				console.log("Route handler not found");		
				throw new URIError("Unsupported route: " + pathString);
			}
			console.log("Running route handler for [" + controllerName + "]");
			try {
				routeHandler(request, response, pathElements);
			}
			catch (error) {
				throw Error(error.message);
			}
		}
		else {
			console.log("Controller not found");
			throw new URIError(MSG_ROUTE_UNKNOWN);
		}
	}
	catch (error) {
		throw Error(error);
	}
}