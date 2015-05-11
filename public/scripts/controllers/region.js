angular.module('irisApp.Controllers')
    .controller('regionController', ["$scope", "$http", function ($scope, $http) {
        $scope.delRegion = function (region, boardId) {
            console.log("Delete region from board", region, boardId);
        };
        $scope.addItem = function (region, boardId) {
            $http.put("api/note", {boardId: boardId, regionId: region._id}).error(function (data) {
                console.error(data);
            }).success(function (note) {
                region.notes.push(note);
            });
        };
        $scope.delNote = function (boardId, note) {
            $http.delete("api/note/" + boardId + "/" + note._id)
                .error(function (data) {
                    console.error(data);
                }).success(function (data) {
                    console.log("deleted");
                });
        }
    }]);