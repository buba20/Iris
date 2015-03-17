var url = require('url');
var controller = (function() {
	var getUsers = function(request, response) {
		response.end("Data for all users.");
	};

	var getUserById = function(request, response, splitUrl) {
		var id = parseInt(splitUrl[0]);
		response.end("Data for user id = " + id.toString() + ".");
	};	
	var decoratedController = function() {		
	};
	
	decoratedController.handlers = {
		"GET": {
			"^$": getUsers,
			
			// /users/{id}/
			"^\\d+\/{0,1}$": getUserById
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