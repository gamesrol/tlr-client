/* User Controller */
app.controller('login', function($scope, $http, $cookieStore, $dialogs, $modal, $interval,$location) {
	
	if(!$cookieStore.get('user')){		 
	  	$scope.login = function(){
			
			var dataObject = 'name='+ $('#login_user').val() +'&password='+ $('#login_password').val();
			var responsePromise = $http.post(urlServer+"/login", dataObject);
	       	
	       	responsePromise.success(function(user, status, headers, config) {
	        	if(!user.errors){		 	        		
	            	$cookieStore.put('user', user);           			            		            		
	               	location.reload();         			            		            		
	            }else{
	            	$dialogs.error("Error en el logeo");
	            	$cookieStore.remove(user); 	            	  			            		            		
	            }	
	       	});
	        
	        responsePromise.error(function(data, status, headers, config) {
	          	 $dialogs.error("Error en la conexion");
	       	});

        };	

	 	$scope.athu = false;
  	}else{  		
		$scope.logout = function(){				
			$cookieStore.remove('user');  				
			location.reload();         			            		            		  		
        };	
  		$scope.athu = true;

  	  	$scope.openPub = function () {
	        $modal.open({
	            templateUrl: 'partials/publisher.html',
	            backdrop: true,
	            windowClass: 'modal',
	            controller: 'publisher',            
	        });
    	};

    	$scope.profile = function (){
    		$location.path("/profile");  
    	}
  	}		
	
	var is_connected = function(){
		$http({
	        method: "GET",
	        url: urlServer+"/version"
	    }).success(function() {
			$scope.connection = true;
			$cookieStore.put("connection", true);
	    }).error(function() {
           	$scope.connection = false;
           	$cookieStore.put("connection", false);
	   	});
	}	
	$interval(is_connected(), 500);
});

app.controller('createUser', function($scope, $http, $cookieStore,$dialogs, $location) {
	if(!$cookieStore.get('user')){				
		$scope.create= function(){	  		
	  		var dataObject = 
		        	'name='+ $scope.user.name +
		        	'&profile='+ $scope.user.profile +
		        	'&email='+ $scope.user.email +
		        	'&password='+ $scope.user.password +
		        	'&password_confirmation='+ $scope.user.passwordConfirmation +
		        	'&accept='+ $scope.user.accept;
	  		var responsePromise = $http.post(urlServer+"/signup", dataObject);
			
			responsePromise.success(function( user ) {	    		
				if(user.message == "Cuenta creada!!"){		 
	            	$dialogs.notify(user.message, user.message);
	            	$scope.user = {};
	            }else{
	            	$dialogs.error(user.message);	            	           			            		            		
	            }
		    });

		    responsePromise.error(function( user ) {
	            $dialogs.error("Error en la conexion");
		    });								    
	  	};
  	}else{
  		$location.path("/posts");  		
  	}		
});

app.controller('editUser', function($scope, $http, $cookieStore, $location,$route) {	
	$scope.user = $cookieStore.get('user');
	$scope.edit = function(){
		/*var dataObject = 'content='+ encodeURIComponent($scope.post.text)+"&user_id="+$scope.user.id;
	  	var responsePromise = $http.post(urlServer+"/pub", dataObject);
		$modalInstance.dismiss();
		responsePromise.success(function( json ) {	    		
			$location.path("/posts"); 
			$route.reload(); 
			console.log(json);
		});*/		
		console.log($scope.user);
	}	
});


/* Post Controller */

app.controller('publisher', function($scope, $http, $cookieStore, $location,$modalInstance,$route) {	
	$scope.user = $cookieStore.get('user');
	$scope.pub = function(){
		var dataObject = 'content='+ encodeURIComponent($scope.post.text)+"&user_id="+$scope.user.id;
	  	var responsePromise = $http.post(urlServer+"/pub", dataObject);
		$modalInstance.dismiss();
		responsePromise.success(function( json ) {	    		
			$location.path("/posts"); 
			$route.reload(); 
			console.log(json);
		});
		
	}	
});

app.controller('posts', function($scope, $http, $cookieStore, $location, $routeParams) {
	if(!$cookieStore.get('user')){		 
	  	$location.path("/");  		
  	}else{
  		var user = $cookieStore.get('user');

		if ($routeParams.tag){
			var responsePromise = $http.get(urlServer+"/postsTag/"+$routeParams.tag);	
			responsePromise.success(function(posts) {	    
				//String(post.content).replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="200" height="100" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '<iframe src="//player.vimeo.com/video/$1" width="200" height="100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				$scope.posts = posts;			
			});
		}else if($routeParams.user){
			var responsePromise = $http.get(urlServer+"/posts/"+$routeParams.user);	
			responsePromise.success(function(posts) {	    
				//String(post.content).replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="200" height="100" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '<iframe src="//player.vimeo.com/video/$1" width="200" height="100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				$scope.posts = posts;			
			});
		}else{
			var responsePromise = $http.get(urlServer+"/posts/"+user.name);	
			responsePromise.success(function(posts) {	    
				//String(post.content).replace(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="200" height="100" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>').replace(/(?:http:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/g, '<iframe src="//player.vimeo.com/video/$1" width="200" height="100" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
				$scope.posts = posts;			
			});
		}
  	}  	
});