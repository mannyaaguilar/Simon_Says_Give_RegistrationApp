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

myApp.controller('checkInOutController', ['$scope', '$location', function($scope, $location) {
  $scope.checkIn = function(){
  console.log("Check in button clicked");
  // $location.path('/volunteer');
  };
  $scope.checkOut = function(){
  console.log("Check out button clicked");
  // route to confirmation view
  // $location.path('/ ');
  };
}]);

myApp.controller('LoginController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to user page');
            $location.path('/user');
          } else {
            console.log('failure: ', response);
            $scope.message = "Wrong!!";
          }
        });
      }
    }

    $scope.registerUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }
}]);

myApp.controller('startEventController', ['$scope', '$location', function($scope, $location) {
  $scope.code = {
    thisCode: ''
  };
  $scope.eventCode = function(code){
  console.log("Event Code button clicked", code.thisCode);
  $location.path('/checkInOut');
};
}]);

myApp.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

}]);

myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};

  function redirect(page){
    console.log('in page navigation', page);
    $location.url(page);
  }

  return {
    userObject : userObject,
    redirect : redirect,

    getuser : function(){
      $http.get('/user').then(function(response) {
        // console.log('logging response.data in get user: ', response.data);
          if(response.data.username) {
              // user has a curret session on the server
              userObject.id = response.data.id;
              userObject.userName = response.data.username;
              console.log('User userName, id: ', userObject.userName, userObject.id);
          } else {
              // user has no session, bounce them back to the login page
              $location.path('/login');
          }
      });
    },

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path('/login');
        });
    }
  };
}]);
