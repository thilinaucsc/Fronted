/**
 * app Route Config js 
 */

(function(){
  "use strict";

  angular.module('loginDashboardApp')

  .config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
     .state('app', {
        abstract: true,
        templateUrl: 'views/home.html',
        controller: 'homeController'
    })
    .state('app.login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginController'    
    })
    .state('app.signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'signupController'    
    })
    // Dashboard State 
    .state('dashboard', {
        abstract: true,
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'    
    })
    .state('dashboard.view', {
        url: '/dashboard',
        templateUrl: 'views/dashboard-view.html',
        controller: 'graphController'    
    })
    .state('dashboard.calendar', {
        url: '/calendar',
        templateUrl: 'views/calendar.html'        
    })
    .state('dashboard.forms', {
        url: '/forms',
        templateUrl: 'views/forms.html'        
    })
    .state('dashboard.tables', {
        url: '/tables',
        templateUrl: 'views/tables.html',
        controller: 'tableController'        
    });

  // Other wise set state 
  $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get("$state");
      $state.go('app.login');
  });

  
})

.run(function run( $http, $cookies ){
  
  $http.defaults.headers.common["x-access-token"] = $cookies.get('AUTH-TOKEN');

})

})();