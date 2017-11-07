'use strict';

angular.module('libraryApp').controller('LoginCtrl',
    function ($scope, $http, $state, $mdDialog, ralibrary, auth, toastSvc) {

        if (auth.isAuthenticated()) {
            $state.go('adminHome');
        }

        $scope.userName = "";
        $scope.password = "";

        $scope.login = function () {
            //alert($scope.password);
            var promise = auth.authenticate($scope.userName, $scope.password);
            isBusy(true);
            promise.then(loginSuccess, loginError);
        }

        var loginSuccess = function (re) {
            isBusy(false);
            toastSvc.showSimple("Login Success");
            var token = re.data.IdToken;
            auth.setToken(token);
            $state.go('adminHome');
            
        }

        var loginError = function (re) {
            isBusy(false);
            toastSvc.showSimple(re.statusText);
        }

        var isBusy = function (busy) {
            if (busy) {
                $mdDialog.show({
                    contentElement: '#busyIndicator',
                    parent: angular.element(document.body),
                    targetEvent: null,
                    clickOutsideToClose: false
                });
            } else {
                $mdDialog.hide();
            }
        }
    }
);
