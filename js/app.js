$(document).ready(function() {
  $.backstretch("gfx/bg1.svg");
});

var urlServer= "http://77.230.212.178:3000";
var urlServer= "http://217.217.60.111:3000";
//var urlServer= "http://192.168.1.138:3000";
//var urlServer= "http://0.0.0.0:3000";

var app = angular.module('tomalared', ['ngRoute','ngCookies','ngResource','ui.bootstrap','dialogs','infinite-scroll']);  

app.filter("postsParse", function($sce){
  return function(text){
    var words = text.split(" ");
    var textFinal = "";
    var yturl= /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g;
    var ytembed = '<iframe src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>';    
    var vimurl = /(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g;
    var vimembed = '<iframe src="//player.vimeo.com/video/$1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
    var tagurl = /(^#(.+))/;
    var tagembed = '<a href="#/tag/$2">$1</a>';
    var userurl = /(^@(.+))/;
    var userembed = '<a href="#/user/$2">$1</a>';
    var imgurl = /((https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|](.png|.jpg|.jpeg|.gif|.PNG|.JPG|.JPEG|.GIF))$/gim;
    var imgembed = '<img src="$1">'

    // /^#/
    for (x=0;x<words.length;x++){            
      textFinal += words[x].replace(yturl, ytembed).replace(vimurl, vimembed).replace(imgurl, imgembed).replace(tagurl, tagembed).replace(userurl, userembed)+" ";          
    }

    replacePattern1 = /^(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = textFinal.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
    replacePattern3 = /^(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
    
    return $sce.trustAsHtml(replacedText);
  }     
});

app.config(function($routeProvider, $httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.useXDomain = true;

  $routeProvider.
    when('/', {
      templateUrl: 'partials/createUser.html',
      controller: 'createUser'
    }).
    when('/profile', {
      templateUrl: 'partials/editUser.html',
      controller: 'editUser'
    }).
    when('/posts', {
      templateUrl: 'partials/posts.html',
      controller: 'posts'
    }).
    when('/tag/:tag', {
      templateUrl: 'partials/posts.html',
      controller: 'posts'
    }).
    when('/user/:user', {
      templateUrl: 'partials/posts.html',
      controller: 'posts'
    }).      
    otherwise({
      redirectTo: '/'
    });
});



/*
          .replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '<iframe src="//player.vimeo.com/video/$1" width="200" height="100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
          var yturl= /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([\w\-]{10,12})(?:&feature=related)?(?:[\w\-]{0})?/g;
          var ytplayer= '<embed-video ng-href="https://www.youtube.com/embed/$1">$1</embed-video>';
          var embed = text.replace(yturl, ytplayer);
  */  
/*

var url = $(this).attr('href');
if (url != null)
{
  var matches = url.match(yturl);
  if (matches)
  {
    
    var iframe = $(embed);

    iframe.insertAfter(this);
    $(this).remove();
  }
}
*/
