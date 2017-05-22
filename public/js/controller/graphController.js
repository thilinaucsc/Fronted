/**
 * Graph Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

	.controller('graphController', ['$scope','$state','dashboardService','toastr','$cookies','$interval',graphController]);

	function graphController($scope,$state,dashboardService,toastr,$cookies,$interval){

        // graph View config 
        $scope.labels = ["Sunday","Monday", "Tuesday", "Wedndesday", "Thursday", "Friday", "Saturday"];
        $scope.series = ['Series A', 'Series B'];
        $scope.graphData = [];        

        // After 2 second update graph data 
        $interval(function () {
             // call get Graph data API  
            dashboardService.getDashboardData().success(function(data){            
                $scope.serverData = data;
                // server data 
                for(var i=0; i < $scope.serverData.length; i++){
                    // series data
                    for(var k=0; k < $scope.series.length; k++){
                        // if true                
                        if($scope.series[k] == $scope.serverData[i]['seris']){
                            $scope.graphData[k] = $scope.serverData[i]['dataArray'];
                            break;
                        }
                    }
                }            
            }).error(function(err){
                console.log(err);
            })
        }, 2000);
      }

})();