/**
 * sign up  Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('signupController', ['$scope','$rootScope','$state','userService','toastr',signupController]);

	function signupController($scope,$rootScope,$state,userService,toastr){
            
            // config 
            $scope.data = {email : '',password : '',confPassword : ''}

            // login function 
            $scope.signup = function(data){    
                        
                // user auth data 
                var authData = {
                  email : data.email,
                  password : data.password
                }  
                
                // call check User API  
                userService.checkUser(authData).success(function(data){

                  // check user Success 
                  if(data.message == 'OK'){                        
                        
                    // call new User API  
                    userService.newUser(authData).success(function(data){

                        toastr.success('Registraion Success', 'Success');
                        $state.go('app.login');

                      }).error(function(){
                        // if error                   
                        toastr.error('Unable to Singup To System', 'Error');
                        $scope.data = {username : '',password : '',confPassword : ''};  
                    })
                  }

                  // Login Faild 
                  if(data.message == 'NO'){                        
                        toastr.error('Email address Already Register','Error');    
                        $scope.data = {email : '',password : '',confPassword : ''};                    
                  }   

                  // else error 
                  if((data.message != 'OK')&&(data.message != 'NO')){
                    toastr.error('Unable to Singup To System', 'Error');
                    $scope.data = {username : '',password : '',confPassword : ''}; 
                  } 

                }).error(function(){

                  // if error                   
                  toastr.error('Unable to Singup To System', 'Error');
                  $scope.data = {username : '',password : '',confPassword : ''};  
                })
      
            }
        }

})();