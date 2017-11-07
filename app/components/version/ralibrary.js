(function () {

    var ralibrary = function ($http, auth) {

        var serverUrl = "https://apcndaec3ycs12.ra-int.com/ralibrary/";

        var get = function (router) {
            return $http.get(serverUrl + router);
        };

        var post = function (router, data) {
            return $http({
                method: "POST",
                url: serverUrl + router,
                data: data,
                headers: {'Authorization': 'Bearer ' + auth.getToken()}
            });
        }

        var del = function (router) {
            return $http({
                method: "DELETE",
                url: serverUrl + router,
                headers: {'Authorization': 'Bearer ' + auth.getToken()}
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