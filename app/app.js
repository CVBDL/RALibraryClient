// Declare app level module which depends on views, and components
(function () {
    var app = angular.module('libraryApp', [
	'ngMaterial', 
	'ngMessages', 
	'ngMdIcons', 
	'material.svgAssetsCache', 
	'ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {

        var browseState = {
            name: 'browse',
            url: '/browse',
            controller: 'BrowseCtrl',
            templateUrl: 'browse/browse.html'
        }

        var profileState = {
            name: 'profile',
            url: '/profile',
            controller: 'ProfileCtrl',
            templateUrl: 'profile/profile.html'
        }

        var searchState = {
            name: 'search',
            url: '/search',
            controller: 'SearchCtrl as ctrl',
            templateUrl: 'search/search.html'
        }

        var adminHomeState = {
            name: 'adminHome',
            url: '/admin/home',
            controller: 'AdminHomeCtrl',
            templateUrl: 'admin-home/admin-home.html'
        }

        var newBookState = {
            name: 'newBook',
            url: '/admin/newbook',
            controller: 'AdminNewBookCtrl',
            templateUrl: 'admin-newbook/admin-newbook.html'
        }

        var updateBookState = {
            name: 'updateBook',
            url: '/admin/updatebook/:id',
            controller: 'AdminUpdateBookCtrl',
            templateUrl: 'admin-updatebook/admin-updatebook.html'
        }

        var loginState = {
            name: 'login',
            url: '/login',
            controller: 'LoginCtrl',
            templateUrl: 'login/login.html'
        }

        $urlRouterProvider.otherwise("/login");

        $stateProvider.state(browseState);
        $stateProvider.state(profileState);
        $stateProvider.state(searchState);
        $stateProvider.state(adminHomeState);
        $stateProvider.state(newBookState);
        $stateProvider.state(updateBookState);
        $stateProvider.state(loginState);
    });
}());
