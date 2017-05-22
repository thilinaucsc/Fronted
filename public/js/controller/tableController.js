/**
 * table Controller js 
 */
(function() {
	'use strict';
	angular.module('loginDashboardApp')

    .factory('PagerService', PagerService)

	.controller('tableController', ['$scope','$rootScope','$state','dashboardService','PagerService','toastr',tableController]);

	function tableController($scope,$rootScope,$state,dashboardService,PagerService,toastr){
            
        
        $scope.tableData = [];
        $scope.pager = {};
        $scope.setPage = setPage;
        $scope.pageSize = 20;  // Page Size 20 
        $scope.totalRecord = 0;
        $scope.items = [];
        $scope.setPage(1);

        function setPage(page) {
            if (page < 1 || page > $scope.pager.totalPages) {
                return;
            }
            // get table data total count API 
            dashboardService.getTableDataTotalCount().success(function(data){ 
                
                $scope.totalRecord = data.total;                
                // Select page data 
                $scope.pager = PagerService.GetPager($scope.totalRecord, page, $scope.pageSize);

                // set index range 
                var startIndex = $scope.pager.startIndex;
                var endIndex = $scope.pager.endIndex;
                // Get Selected Page Table Data API 
                dashboardService.getSelectPageTableData(startIndex,endIndex).success(function(data){                                                 
                    $scope.items = data;                                    
                }).error(function(err){
                    console.log(err);
                })                
            }).error(function(err){
                console.log(err);
            })           
        }
  }

  function PagerService() {
        // service definition
        var service = {};

        service.GetPager = GetPager;

        return service;

        // service implementation
        function GetPager(totalItems, currentPage, pageSize) {
            // default to first page
            currentPage = currentPage || 1;

            // default page size is 10
            pageSize = pageSize || 10;

            // calculate total pages
            var totalPages = Math.ceil(totalItems / pageSize);

            var startPage, endPage;
            if (totalPages <= 10) {
                // less than 10 total pages so show all
                startPage = 1;
                endPage = totalPages;
            } else {
                // more than 10 total pages so calculate start and end pages
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages to ng-repeat in the pager control

            //var pages = startPage + endPage + 1;   
            var pageArray = [];
            for(var i = 0 ; i < endPage ; i ++){
              pageArray[i] = i + 1;
            }         
            var pages = pageArray;

            // return object with all pager properties required by the view
            return {
                totalItems: totalItems,
                currentPage: currentPage,
                pageSize: pageSize,
                totalPages: totalPages,
                startPage: startPage,
                endPage: endPage,
                startIndex: startIndex,
                endIndex: endIndex,
                pages: pages
            };
        }
      }

})();