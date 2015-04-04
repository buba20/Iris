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


angular.module("IrisApp")
    .directive("delBoardBtn", ["$modal", "$location", "BoardService",
        function ($modal, $location, boardService) {
            return {
                restrict: "E",
                link: function (scope, element, attrs, controllers) {
                    element.on('click', function (e) {
                        $modal.open({
                            templateUrl: "confirmDeleteModal.html",
                            controller: "ModalInstanceCtrl"
                        }).result.then(function () {
                                boardService
                                    .delete(attrs.boardId)
                                    .success(function () {
                                        $location.url("/board/");
                                    });
                            });
                    });
                },
                templateUrl: "delBtnTmp.html"
            }
        }]);