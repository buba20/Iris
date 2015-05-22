angular.module('irisApp.Controllers')
    .controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

        $scope.yes = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss("cancel");
        };
    });