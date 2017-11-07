(function () {
    var app = angular.module('libraryApp');
    app.controller('AdminUpdateBookCtrl', function ($scope, $http, $mdDialog, ralibrary, $state, $stateParams, auth, toastSvc) {

        if (!auth.isAuthenticated()) {
            $state.go('login');
        }

        $scope.book = {
            id: "",
            isbn: "",
            code: "",
            title: "",
            subTitle: "",
            authors: "",
            description: "",
            thumbnailLink: "",
            publisher: "",
            publishedDate: "",
            pageCount: "",
            rowVersion: {}
        };

        var onGetBookOK = function (response) {
            var data = response.data;
            $scope.book.id = data.Id;
            $scope.book.code = data.Code;
            $scope.book.title = data.Title;
            $scope.book.subTitle = data.Subtitle;
            $scope.book.authors = data.Authors;
            $scope.book.thumbnailLink = data.ThumbnailLink;
            $scope.book.description = data.Description;
            $scope.book.publisher = data.Publisher;
            $scope.book.publishedDate = data.PublishedDate;
            $scope.book.pageCount = data.PageCount;
            $scope.book.rowVersion = data.RowVersion;

            if (data.ISBN10 != undefined && data.ISBN10 != null && data.ISBN10 != "") {
                $scope.book.isbn = data.ISBN10;
            }

            if (data.ISBN13 != undefined && data.ISBN13 != null && data.ISBN13 != "") {
                $scope.book.isbn = data.ISBN13;
            }
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

        $scope.check = function () {
            //e.g. 9787302232599
            var isbn = $scope.book.isbn;
            var promise = ralibrary.get("api/book/isbn/" + isbn);
            isBusy(true);
            promise.then(onCheckComplete, onError);
        }

        $scope.back = function () {
            $state.go('adminHome');
        }

        $scope.save = function () {
            var data = {
                Id: $scope.book.id,
                Code: $scope.book.code,
                Title: $scope.book.title,
                Subtitle: $scope.book.subTitle,
                Authors: $scope.book.authors,
                Publisher: $scope.book.publisher,
                PublishedDate: $scope.book.publishedDate,
                PageCount: $scope.book.pageCount,
                ThumbnailLink: $scope.book.thumbnailLink,
                Description: $scope.book.description,
                RowVersion: $scope.book.rowVersion
            };

            var len = $scope.book.isbn.length;
            if (len == 10) {
                data.ISBN10 = $scope.book.isbn;
            } else if (len == 13) {
                data.ISBN13 = $scope.book.isbn;
            }
            var router = "api/books/" + $scope.book.id;
            isBusy(true);
            ralibrary.post(router, data).then(saveOK, onError);
        }

        var saveOK = function () {
            isBusy(false);
            toastSvc.showSimple("Save successfully");
        }

        var onCheckComplete = function (response) {
            isBusy(false);
            var data = response.data;
            $scope.book.title = data.Title;
            $scope.book.subTitle = data.Subtitle;
            $scope.book.authors = data.Authors;
            $scope.book.thumbnailLink = data.ThumbnailLink;
            $scope.book.description = data.Description;
            $scope.book.publisher = data.Publisher;
            $scope.book.publishedDate = data.PublishedDate;
            $scope.book.pageCount = data.PageCount;
        }

        var onError = function (response) {
            isBusy(false);
            if (response.status == 400) {
                toastSvc.showSimple(response.data.Message);
            } else {
                toastSvc.showSimple(response.statusText);
            }
        }

        var id = $stateParams.id;
        var router = "api/books/" + id;
        ralibrary.get(router).then(onGetBookOK, onError)
    });
}());