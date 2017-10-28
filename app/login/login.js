'use strict';

angular.module('libraryApp').controller('LoginCtrl', 
  function($scope, $http, $state, ralibrary, auth, toastSvc) {

    if (auth.isAuthenticated()) {
        $state.go('adminHome');
    }

    $scope.userName = "";
    $scope.password = "";

    $scope.login = function(){
        //alert($scope.password);
        auth.authenticate($scope.userName, $scope.password)
            .then(loginSuccess, loginError);
    }

    var loginSuccess = function(re){
        toastSvc.showSimple("Login Success");
        var token = re.data.IdToken;
        auth.setToken(token);
        $state.go('adminHome');
    }

    var loginError = function(re){
        toastSvc.showSimple(re.statusText);
    }
  }
);
