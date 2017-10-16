(function () {

    var ralibrary = function ($http) {

        var serverUrl = "http://localhost:32140/";

        var get = function (router) {
            return $http.get(serverUrl + router);
        };

        var post = function (router, data) {
            return $http({
                method: "POST",
                url: serverUrl + router,
                data: data,
            });
        }

        var del = function (router) {
            return $http({
                method: "DELETE",
                url: serverUrl + router,
            });
        }

        return {
            get: get,
            post: post,
            del: del
        }
    }

    var app = angular.module('libraryApp');
    app.factory("ralibrary", ralibrary);

}());