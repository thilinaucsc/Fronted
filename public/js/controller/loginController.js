/**
 * login Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('loginController', ['$scope','$rootScope','$state','userService','toastr','$cookies',loginController]);

	function loginController($scope,$rootScope,$state,userService,toastr,$cookies){
            
            // config 
            $scope.data = {email : '',password : ''};            

            // login function 
            $scope.login = function(data){ 

                // user auth data 
                var authData = {
                  email : data.email,
                  password : data.password
                }  
                
                // call auth create check user API  
                userService.authUser(authData).success(function(data){       
                  
                  var CTOKEN = $cookies.get('AUTH-TOKEN');                  

                  // Login Success 
                  if(data.message == 'success'){                        
                        toastr.success('Login Success', 'Success');
                        $cookies.put('AUTH-TOKEN',data.token);
                        $state.go('dashboard.view');
                  }

                  // Login Faild 
                  if(data.message == 'faild'){                        
                        toastr.error('User Name or Password not valid', 'Warning');     
                        $scope.data = {email : '',password : ''};                   
                  }  

                }).error(function(){

                  // if error                   
                  toastr.error('Unable to Login to System', 'Error');
                  $scope.data = {email : '',password : ''};
                })
      
            }
        }

})();