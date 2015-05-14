'use strict';

/**
 * @ngdoc service
 * @name irisApp.boardService
 * @description
 * # board
 * Service in the irisApp.
 */
angular.module('irisApp.Services')
    .service('BoardService', ['$http', 'urls', function ($http, urls) {
        function createNew() {
            return $http.put(urls.newBoardUrl, {})
                .error(function (data) {
                    console.log(data);
                });
        }

        function get(id) {
            var url = id ? urls.boardUrl + "/" + id : urls.boardUrl;

            return $http.get(url)
                .error(function (data) {
                    console.error(data);
                });
        }

        function update(board) {
            return $http.post(urls.boardUrl, board).error(function (data) {
                console.error(data);
            });
        }

        function deleteBoard(id) {
            return $http.delete(urls.boardUrl + "/" + id).error(function (data) {
                console.error(data);
            });
        }

        return {
            createNew: createNew,
            get: get,
            update: update,
            delete: deleteBoard
        };
    }]);
