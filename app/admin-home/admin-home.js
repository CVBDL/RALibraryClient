(function () {
    var app = angular.module('libraryApp');
    app.controller("AdminHomeCtrl", function ($scope, $http, $mdDialog, $state, ralibrary, auth, toastSvc) {

        if (!auth.isAuthenticated()) {
            $state.go('login');
        }

        var doSearch = function (keyword) {
            if (keyword == undefined || keyword == null || keyword == "") {
                ralibrary.get("api/books").then(onSearchComplete, onError);
            } else {
                var router = "api/books/" + $scope.keyword;
                ralibrary.get(router).then(onSearchComplete, onError);
            }
        }

        var onSearchComplete = function (re) {
            if (re.data instanceof Array) {
                $scope.books = re.data;
            }
        }

        var onError = function (re) {
            toastSvc.showSimple(re.statusText);
        }

        var onDelOK = function (re) {
            doSearch($scope.keyword);
        }

        var onDelError = function (re) {
            toastSvc.showSimple("Delete book failure");
        }

        $scope.search = function () {
            doSearch($scope.keyword);
        }

        $scope.keyword = "";

        $scope.editBook = function (book) {
            $state.go('updateBook', { id: book.Id });
        }

        $scope.deleteBook = function (ev) {
            var confirm = $mdDialog.confirm()
                .title('Are you sure to delete your book?')
                .textContent('All of the borrow history will be deleted.')
                .ariaLabel('TODO:')
                .targetEvent(ev)
                .ok('Continue')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function () {
                var router = "api/books/" + ev.Id;
                ralibrary.del(router).then(onDelOK, onDelError);
            }, function () {
                // Do Nothing
            });
        };

        $scope.newBook = function () {
            $state.go('newBook');
        }

        $scope.searchKeyUp = function (e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                doSearch($scope.keyword);
            }
        }

        doSearch();
    });

}());