"use strict";
angular.module("irisApp", ["ngRoute","ngResource", "irisApp.Controllers", "irisApp.Directives", "ui.bootstrap","toaster"])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            controller: "boardListCtrl",
            templateUrl: "templates/home.html"
        }).when("/board/:id", {
            controller: "boardCtrl",
            templateUrl: "templates/board.html"
        }).otherwise({
            redirectTo: "/"
        });
    }]);