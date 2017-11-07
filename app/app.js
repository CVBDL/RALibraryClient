// Declare app level module which depends on views, and components
(function () {
    var app = angular.module('libraryApp', [
	'ngMaterial', 
	'ngMessages', 
	'ngMdIcons', 
	'material.svgAssetsCache', 
	'ui.router']);
    app.config(function ($stateProvider, $urlRouterProvider) {

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

        $stateProvider.state(adminHomeState);
        $stateProvider.state(newBookState);
        $stateProvider.state(updateBookState);
        $stateProvider.state(loginState);
    });
}());
