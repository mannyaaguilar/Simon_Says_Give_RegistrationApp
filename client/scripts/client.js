var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

// Angular Material Theme
myApp.config(['$mdThemingProvider', function($mdThemingProvider){
  $mdThemingProvider.theme('altTheme').primaryPalette('blue').accentPalette('blue');
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
    // Admin landing View
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // Register new user View
    .when('/addAdminUser', {
      templateUrl: '/views/templates/addAdminUser.html',
      controller: 'AddAdminController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // Create Event View
    .when('/createEvent', {
      templateUrl: '/views/templates/createEvent.html',
      controller: 'CreateEventController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // Event View
    .when('/displayEvents', {
      templateUrl: '/views/templates/events.html',
      controller: 'EventController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // Export to .csv view
    .when('/export', {
      templateUrl: '/views/templates/export.html',
      controller: 'ExportController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // Import .csv file View
    .when('/import', {
      templateUrl: '/views/templates/import.html',
      controller: 'ImportController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
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
    //adds volunteerView and controller
    .when('/volunteer', {
      templateUrl: '/views/templates/volunteer.html',
      controller: 'VolunteerController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
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
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Waiver View for adult primary
    .when('/waiver-adult', {
      templateUrl: '/views/templates/adultWaiver.html',
      controller: 'WaiverController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Waiver View for adult primary
    .when('/waiver-youth', {
      templateUrl: '/views/templates/youthWaiver.html',
      controller: 'WaiverController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Waiver View for adult primary
    .when('/waiver-photo', {
      templateUrl: '/views/templates/photoWaiver.html',
      controller: 'WaiverController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Confirmation View
    .when('/confirmation', {
      templateUrl: '/views/templates/confirmation.html',
      controller: 'ConfirmationController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Override View
    .when('/override', {
      templateUrl: '/views/templates/override.html',
      controller: 'OverrideController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    // Checkout View
    .when('/checkout', {
      templateUrl: '/views/templates/checkout.html',
      controller: 'CheckoutController',
      resolve: {
        checkevent : ['UserService', function(UserService){
          return UserService.checkEvent();
        }]
      }
    })
    //
    .otherwise({
      redirectTo: 'home'
    });
}]);
