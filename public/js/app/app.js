angular.module("IrisApp", ["ngRoute", "home"]).config(["$routeProvider", function ($routeProvider) {
    $routeProvider.otherwise({
        redirectTo: "/"
    });
}]);