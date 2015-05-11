'use strict';

/**
 * @ngdoc function
 * @name irisApp.controller:AlertCtrl
 * @description
 * # AlertCtrl
 * Controller of the irisApp
 */
angular.module('irisApp.Controllers')
  .controller('AlertCtrl', ["$scope", "$rootScope", function ($scope, $rootScope) {
      $scope.alerts = [];

      $scope.addAlert = function (type, message) {
        $scope.alerts.push({type: type, msg: message});
      };

      $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
      };
      $rootScope.alertCtrl = $scope;

    }]);
