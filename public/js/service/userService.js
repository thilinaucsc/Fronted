/**
 * stock Ticker Service js 
 */
(function() {
    "use strict";
    angular.module('loginDashboardApp')

    .service('userService', ['$http','constants', userService]);

    function userService($http,constants) {
        return {
            checkUser: function(data){
                return $http.post(constants.SERVER_URL+ '/api/checkUser',data);
            },
            newUser: function(data){
                return $http.post(constants.SERVER_URL+ '/api/newUser',data);
            },
            authUser: function(data){                
                return $http.post(constants.SERVER_URL+ '/api/authUser',data);
            }
        };
    }
})();