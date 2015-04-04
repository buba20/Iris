angular.module("IrisApp", ["ngRoute", "IrisApp.Controllers", "ui.bootstrap"])
    .controller('AlertDemoCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
        $scope.alerts = [];

        $scope.addAlert = function (type, message) {
            $scope.alerts.push({type: type, msg: message});
        };

        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $rootScope.alertCtrl = $scope;
    }])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: "/"
        });
    }]);