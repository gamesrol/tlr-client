var app = angular.module('Tomalared', ["ngCookies",'ui.bootstrap','dialogs']);
var urlServer= "http://77.230.212.178:3000";

app.config(['$routeProvider', function($routeProvider) {	
    $routeProvider.
      when('/', {
        templateUrl: 'partials/createUser.html',
        controller: 'createUser'
      }).
      when('/posts', {
        templateUrl: 'partials/login.html',
        controller: 'posts'
      }).     
      otherwise({
        redirectTo: '/'
      });
  }]);