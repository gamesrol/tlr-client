$(document).ready(function() {
  $.backstretch("gfx/bg1.svg");
});


var urlServer= "http://77.230.212.178:3000";

var app = angular.module('tomalared', ['ngRoute',"ngCookies",'ui.bootstrap','dialogs']);  

app.config(function($routeProvider) {
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
});
