(function () {

    var authentication = function ($http) {

        var storage = window.localStorage;
        var authenticationUrl = "http://localhost:5485/api/user";

        var post = function (userName, password) {
            return $http({
                method: "POST",
                url: authenticationUrl,
                data: { UserName: userName, Password: password },
            });
        }

        var isAuthenticated = function () {
            var token =  storage.getItem("token");
            if (token == undefined || token == "") {
                return false;
            } else {
                return true;
            }
        }

        var clear = function () {
            storage.removeItem("token");
        }

        var setToken = function(token){
            storage.setItem("token", token);
        }

        var getToken = function(){
            return storage.getItem("token");
        }

        return {
            authenticate: post,
            isAuthenticated: isAuthenticated,
            clearToken: clear,
            setToken: setToken,
            getToken: getToken
        }
    }

    var app = angular.module('libraryApp');
    app.factory("auth", authentication);

}());