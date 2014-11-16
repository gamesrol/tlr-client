$(document).ready(function() {
  $.backstretch("gfx/bg1.svg");
});

var urlServer= "http://77.230.212.178:3000";
var urlServer= "http://0.0.0.0:3000";
//var urlServer= "http://192.168.1.138:3000";


function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match&&match[7].length==11){
        return match[7];
    }else{
        alert("Url incorrecta");
    }
}


var app = angular.module('tomalared', ['ngRoute','ngCookies','ngResource','ui.bootstrap','dialogs']);  

app.config(function($routeProvider, $httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.useXDomain = true;
  

  $routeProvider.
    when('/', {
      templateUrl: 'partials/createUser.html',
      controller: 'createUser'
    }).
    when('/logout', {
      templateUrl: 'partials/posts.html',
      controller: 'logout'
    }).
    when('/posts', {
      templateUrl: 'partials/posts.html',
      controller: 'posts'
    }).     
    otherwise({
      redirectTo: '/'
    });
});

