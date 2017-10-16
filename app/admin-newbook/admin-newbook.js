(function () {
    var app = angular.module('libraryApp');
    app.controller('AdminNewBookCtrl', function ($scope, $http, $state, ralibrary, toastSvc) {
        $scope.book = {
            isbn: "",
            code: "",
            title: "",
            subTitle: "",
            authors: "",
            description: "",
            thumbnailLink: "",
            publisher: "",
            publishedDate: "",
            pageCount: ""
        };

        $scope.check = function () {
            //e.g. 9787302232599
            var isbn = $scope.book.isbn;
            ralibrary.get("api/book/isbn/" + isbn).then(onCheckComplete, onError);
        }

        $scope.save = function () {
            saveBook();
        }

        $scope.saveAndClear = function () {
            saveBook();
            $scope.book = {
                isbn: "",
                code: "",
                title: "",
                subTitle: "",
                authors: "",
                description: "",
                thumbnailLink: "",
                publisher: "",
                publishedDate: "",
                pageCount: ""
            };
        }

        var saveBook = function () {
            var data = {
                Code: $scope.book.code,
                Title: $scope.book.title,
                Subtitle: $scope.book.subTitle,
                Authors: $scope.book.authors,
                Publisher: $scope.book.publisher,
                PublishedDate: $scope.book.publishedDate,
                PageCount: $scope.book.pageCount,
                ThumbnailLink: $scope.book.thumbnailLink,
                Description: $scope.book.description,
            };

            var len = $scope.book.isbn.length;
            if (len == 10) {
                data.ISBN10 = $scope.book.isbn;
            } else if (len == 13) {
                data.ISBN13 = $scope.book.isbn;
            }
            ralibrary.post("api/books", data).then(saveOK, onError);
        }

        var saveOK = function (re) {
            toastSvc.showSimple("Success");
        }

        $scope.back = function () {
            $state.go('adminHome');
        }

        var onCheckComplete = function (response) {
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
            if (response.status == 400) {
                toastSvc.showSimple(response.data.Message);
            } else {
                toastSvc.showSimple(response.statusText);
            }
        }

    });
}());