var url = require('url');
var controller = (function() {
	var getMainPage = function(request, response) {
		response.writeHead(200, {'Content-Type': 'text/html'});
		resposneString = "<p>Welcome to main page!</p>" +
			"<p>Of course, since it's a REST Api, there should be no such thing like a 'main page'...</p>" +
			"<p>Try a dedicated controller, like /users</p>";;
		return response.end(resposneString)
	};

	var decoratedController = function() {		
	};
	
	decoratedController.handlers = {
		"GET": {
			"^$": getMainPage
		},
		"POST": {
		
		},
		"PUT": {
		
		},
		"DELETE": {
		
		}
	};
	
	return decoratedController;
})();

module.exports = controller;