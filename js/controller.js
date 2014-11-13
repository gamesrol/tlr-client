app.controller('login', function($scope, $http, $cookies,$dialogs) {

	if(!$cookies.user){
		$scope.pageName= "Login & Register";  
	  	$scope.login = function(){
			$http({
		        method: "POST",
		        url: urlServer+"/login?name="+$scope.user.name+"&password="+$scope.user.password,        
		        //data: {name: $scope.user.name, password: $scope.user.password},
		        headers: {'Content-Type': 'application/x-www-form-urlencoded'}        
		    }).success(function( user ) {
		            if(!user.errors){		            			            
		            	$cookies.user = user;	
		            	$location.path("/posts");
		            }else{
		            	$dialogs.error('Error en el logeo');
		            }		           		            
		           	console.log($cookies.user);
		    }).error(function( user ) {
		            $dialogs.error("Error en la conecxion");
		    });						
	  	};
  	}else{
  		$location.path("/posts");
  	}		
}); // end dialogsServiceTest

app.controller('posts', function($scope, $http, $cookies) {
});

app.controller('start', function($scope, $http, $cookies) {
});


  
