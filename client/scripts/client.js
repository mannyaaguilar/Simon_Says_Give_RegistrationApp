var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

// Angular Material Theme
myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('altTheme').primaryPalette('grey').accentPalette('blue-grey');
}]);

/// Routes ///
myApp.config(['$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider
    // Login View
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController',
    })
    // Register new user View
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController'
    })
    // Main View of the app
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/startEvent', {
      templateUrl: '/views/templates/startEvent.html',
      controller: 'startEventController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .when('/checkInOut', {
      templateUrl: '/views/templates/checkInOut.html',
      controller: 'checkInOutController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser();
        }]
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
