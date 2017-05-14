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
    // Import View of the app
    .when('/import', {
      templateUrl: '/views/templates/import.html',
      controller: 'ImportController',
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

myApp.controller('ImportController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  console.log('ImportController loaded');

  var reader;
   var progress = document.querySelector('.percent');

   function abortRead() {
     reader.abort();
   }

   function errorHandler(evt) {
     switch(evt.target.error.code) {
       case evt.target.error.NOT_FOUND_ERR:
         alert('File Not Found!');
         break;
       case evt.target.error.NOT_READABLE_ERR:
         alert('File is not readable');
         break;
       case evt.target.error.ABORT_ERR:
         break; // noop
       default:
         alert('An error occurred reading this file.');
     };
   }

   function updateProgress(evt) {
     // evt is an ProgressEvent.
     if (evt.lengthComputable) {
       var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
       // Increase the progress bar length.
       if (percentLoaded < 100) {
         progress.style.width = percentLoaded + '%';
         progress.textContent = 'Preparing document ' + percentLoaded + '%';
       }
     }
   }

   function handleFileSelect(evt) {
     // Reset progress indicator on new file selection.
     progress.style.width = '0%';
     progress.textContent = 'Preparing document 0%';

     reader = new FileReader();
     reader.onerror = errorHandler;
     reader.onprogress = updateProgress;
     reader.onabort = function(e) {
       alert('File read cancelled');
     };
     reader.onloadstart = function(e) {
       document.getElementById('progress_bar').className = 'loading';
     };
     reader.onload = function(e) {
       // Ensure that the progress bar displays 100% at the end.
       progress.style.width = '100%';
       progress.textContent = 'Preparing document 100%';
       setTimeout("document.getElementById('progress_bar').className='';", 2000);

       console.log(e.target.result);


     }

     // Read in the image file as a binary string.
     reader.readAsText(evt.target.files[0]);
   }

   document.getElementById('files').addEventListener('change', handleFileSelect, false);

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
