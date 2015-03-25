angular.module("IrisApp", ["ngRoute", "IrisApp.Controllers"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }]);