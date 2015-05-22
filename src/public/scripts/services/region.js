angular.module('irisApp.Services')
    .service('regionService', ['$http', function ($http) {
        return {
            newRegion: function (boardId) {
                return $http
                    .put('api/regions/new', {boardId: boardId})
                    .error(function (err) {
                        console.log(err);
                    });
            }
        }
    }]);