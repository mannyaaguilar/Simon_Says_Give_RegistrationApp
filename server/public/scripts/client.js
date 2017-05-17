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
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController',
    })
    .when('/export', {
      templateUrl: '/views/templates/export.html',
      controller: 'AdminController',
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
    //adds volunteerView and controller
    .when('/volunteer', {
      templateUrl: '/views/templates/volunteer.html',
      controller: 'VolunteerController',
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
    // Waiver View for adult primary
    .when('/waiver-adult', {
      templateUrl: '/views/templates/adultWaiver.html',
      controller: 'WaiverController' //RESOLVE
    })
    // Waiver View for adult primary
    .when('/waiver-youth', {
      templateUrl: '/views/templates/youthWaiver.html',
      controller: 'WaiverController' //RESOLVE
    })
    // Waiver View for adult primary
    .when('/waiver-photo', {
      templateUrl: '/views/templates/photoWaiver.html',
      controller: 'WaiverController' //RESOLVE
    })
    // Confirmation View
    .when('/confirmation', {
      templateUrl: '/views/templates/confirmation.html',
      controller: 'ConfirmationController',
    })
    // Override View
    .when('/override', {
      templateUrl: '/views/templates/override.html',
      controller: 'OverrideController',
    })
    //
    .otherwise({
      redirectTo: 'home'
    });
}]);

myApp.controller('AdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("adminController Loaded");

$scope.redirect = UserService.redirect;
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

myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', function($scope, $http, $location, $interval, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  $scope.timer = 0; // timer starts at 0 seconds
  var timeOutLength = 5; //page will change view after x seconds

  // function that changes view to check-in/check-out view after x seconds
  $scope.timeOut = function() {
    var interval = $interval(function(){
      if ($scope.timer < timeOutLength){
        $scope.timer += 1;
        }
      else {
        $scope.changeView();
        $interval.cancel(interval);
      }
    }, 1000);
  }; //end timeout

  //changes view to checkInOut page
  $scope.changeView = function() {
    $location.path('/checkInOut');
    //user path for testing:
    // $location.path('/user');
  };

  // timeOut function runs when confirmation view is loaded
  $scope.timeOut();

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
            console.log('redirecting to admin page');
            $location.path('/admin');
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

myApp.controller('OverrideController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('OverrideController loaded');

$scope.redirect = UserService.redirect;

//function to send user back to the appropriate waiver view
$scope.waiverView = function() {
  console.log('need to add appropriate $location logic');
  // $location.path('/somewhereAwesome');
};

//function to validate admin code and bring user to confirmation view
$scope.finish = function() {
  //NEED TO ADD CODE VALIDATION!!! If/else logic?
  console.log('sending to confirmation without code for now');
  $location.path('/confirmation');
};

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

myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteerCheckIn = UserService.volunteerCheckIn;


var volunteer = {
  email: '',
  first_name: '',
  last_name: '',
  under_18: true,
  dob: ''
};

// $scope.birthDate = new Date();
//
//   // this.minDate = new Date(
//   //   this.birthDate.getFullYear(),
//   //   this.birthDate.getMonth() - 2,
//   //   this.birthDate.getDate()
//   // );
//   //
//   this.maxDate = new Date(
//     this.birthDate.getFullYear() - 8,
//     this.birthDate.getMonth() ,
//     this.birthDate.getDate()
//   );

//if under_18 = true, redirect to childWaiver, if false, redirect to adultWaiver
//
// $scope.volunteerCheckIn = function(volunteer){
//   console.log("volunteerCheckIn function accessed");
//   if(volunteer.under_18 === true){
//     console.log(volunteer.first_name);
//     $location.path('/waiver-youth');
//   } else if (volunteer.has_signed_waiver === true) {
//     $location.path('/waiver-photo');
//   } else {
//     $location.path('/waiver-adult');
//   }
// };
}]);

myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

$scope.adultWaiver = {};
$scope.submitAdultWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

$scope.youthWaiver = {};
$scope.submitYouthWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

$scope.photoWaiver = {};
$scope.submitPhotoWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

}]);

//SERVICE

myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};

  function redirect(page){
    console.log('in page navigation', page);
    $location.url(page);
  }

  function volunteerCheckIn(volunteer){
    console.log("volunteerCheckIn function accessed", volunteer);
    if(volunteer.under_18 === true){
      console.log("General Waiver Needed- youth", volunteer.dob);
      $location.path('/waiver-youth');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
      console.log("Adult General Waiver & Photo Waiver on record");
      $location.path('/confirmation');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
      console.log("General Waiver on record, just need Photo Waiver");
      $location.path('/waiver-photo');
    } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
      console.log("Photo Waiver on record, just need General Waiver");
      $location.path('/waiver-adult');
    } else {
      $location.path('/waiver-adult');
    }
  }


  return {
    userObject : userObject,
    redirect : redirect,
    volunteerCheckIn: volunteerCheckIn,

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
