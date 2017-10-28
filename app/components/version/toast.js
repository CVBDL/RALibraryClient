(function () {

    var toastSvc = function ($mdToast) {

        var showSimple = function (message) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(message)
                .position("top right")
                .hideDelay(3000)
            );
        };

        return {
            showSimple: showSimple,
        }
    }

    var app = angular.module('libraryApp');
    app.factory("toastSvc", toastSvc);

}());