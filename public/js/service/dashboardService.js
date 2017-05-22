/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('loginDashboardApp')

    .service('dashboardService', ['$http','constants', dashboardService]);

    function dashboardService($http,constants) {
        return {
            getDashboardData: function(){
                return $http.get(constants.SERVER_URL+ '/auth/api/getDashboardData');
            },            
            getTableDataTotalCount : function(){
                return $http.get(constants.SERVER_URL+ '/auth/api/getTableDataTotalCount');
            },
            getSelectPageTableData : function(start,end){
                return $http.get(constants.SERVER_URL+ '/auth/api/getSelectPageTableData?startIndex='+start+'&'+'endIndex='+end);
            }
        };
    }
})();