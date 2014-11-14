app.controller('login', function($scope, $http, $cookieStore, $dialogs, $interval) {
	
	if(!$cookieStore.get('lastValue')){		 
	  	$scope.login = function(){
			var paco = $http({
		        method: "POST",
		        url: urlServer+"/login",        
		        data: {name: $scope.userName, password: $scope.userPassword},
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}        
		    }).success(function( user ) {	    		
	            if(!user.errors){		 
	            	$cookieStore.put('user', user);           			            		            		
	            	$location.path("/posts");
	            	console.log(user);
	            }else{
	            	$dialogs.error('Error en el logeo');
	            	$cookieStore.remove(user);           			            		            		
	            }		           		            	           	
		    }).error(function( user ) {
	            $dialogs.error("Error en la conexion");
		    });								    
	  	};	  	
	 	$scope.athu = false;
  	}else{  		
  		$scope.athu = true;
  	}		
	
	var is_connected = function(){
		$http({
	        method: "POST",
	        url: urlServer+"/login",        
	        data: {name: null, password: null},
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'}        
	    }).success(function() {	    		
			$scope.connection = true;  
			$cookieStore.put("connection", true);
	    }).error(function() {
           	$scope.connection = false;
           	$cookieStore.put("connection", false);
	   	});
	}

	is_connected();
	$interval(is_connected(), 50);
}); // end dialogsServiceTest

app.controller('createUser', function($scope, $http, $cookieStore,$dialogs) {
	$scope.pageName= "Login & Register"; 
	if(!$cookieStore.user){		 
	  	$scope.create = function(){
			var paco = $http({
		        method: "POST",
		        url: urlServer+"/login",        
		        data: {name: $scope.userName, password: $scope.userPassword},
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}        
		    }).success(function( user ) {	    		
	            if(!user.errors){		 
	            	$cookieStore.put(user);           			            		            		
	            	$location.path("/posts");
	            	console.log(user);
	            }else{
	            	$dialogs.error('Error en el logeo');
	            	$cookieStore.remove(user);           			            		            		
	            }		           		            	           	
		    }).error(function( user ) {
	            $dialogs.error("Error en la conexion");
		    });								    
	  	};	  	
	 	$scope.athu = false;
  	}else{
  		$location.path("/posts");
  		$scope.athu = true;
  	}		
});

app.controller('post', function($scope, $http) {
	if(!$cookieStore.user){		 
	  	$location.path("/");  		
  	}else{
  		
  	}		
});


