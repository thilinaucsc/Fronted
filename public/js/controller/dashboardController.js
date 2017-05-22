/**
 * dashboard Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('dashboardController', ['$scope','$state','toastr','$cookies',dashboardController]);

	function dashboardController($scope,$state,toastr,$cookies){


        var token = $cookies.get('AUTH-TOKEN');
        // if not login redirect to login page 
        if(!token){            
            toastr.warning('Un Authorized, Pls Login', 'Warning');
            $state.go("app.login");
        }

        $scope.signOut = function(){            
            toastr.success('SignOut Success', 'Success');
            $cookies.remove('AUTH-TOKEN');
            $state.go("app.login");
        }
            
      }

})();