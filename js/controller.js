app.controller('login', function($scope, $http, $cookieStore,$dialogs) {
	if(!$cookieStore.user){		 
	  	$scope.login = function(){
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
	            $dialogs.error("Error en la conecxion");
		    });								    
	  	};	  	
	 	$scope.athu = false;
  	}else{
  		$location.path("/posts");
  		$scope.athu = true;
  	}		
}); // end dialogsServiceTest

app.controller('createUser', function($scope, $http) {
	$scope.pageName= "Login & Register"; 
});

app.controller('post', function($scope, $http) {
});


