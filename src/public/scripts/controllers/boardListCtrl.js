angular.module('irisApp.Controllers').controller('boardListCtrl', ['$scope', 'boardService', function ($scope, boardService) {

    $scope.boards = [];

    boardService.Board.query(function (boards) {
        $scope.boards = boards;
    });


}]);