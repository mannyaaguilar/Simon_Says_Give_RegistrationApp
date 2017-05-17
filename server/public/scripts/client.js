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
    })
    .when('/checkInOut', {
      templateUrl: '/views/templates/checkInOut.html',
      controller: 'checkInOutController',
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
    // Checkout View
    .when('/checkout', {
      templateUrl: '/views/templates/checkout.html',
      controller: 'CheckoutController',
    })
    // Import View of the app
    .when('/import', {
      templateUrl: '/views/templates/import.html',
      controller: 'ImportController'
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
  // when check in btn clicked, route to volunteer view
  $scope.checkIn = function(){
    $location.path('/volunteer');
  };
  // when check out btn clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);

myApp.controller('CheckoutController', ['$scope', '$location', function($scope, $location) {

//object for input items to bind to
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to assign search results to - has dummy info for now
$scope.volunteerList = [1,2,3,4,5];

//Connected to Search button - take inputs and check for records in database,
// append results to DOM
$scope.search = function() {
  console.log('volunteerObject: ', $scope.volunteerObject);
  //NEED TO ADD: GET to collect matching records by email and/or name
  $scope.success = true;
};

$scope.checkout = function() {
  //NEED TO ADD: PUT ROUTE to add checkout time to chosen volunteer hours record
  console.log('Logging checkout time on click: ', new Date());
  //changes view to confirmation page:
  $scope.changeView();
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
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

myApp.controller('ImportController', ['$scope', '$http', '$location', 'UserService', 'CSVService', function($scope, $http, $location, UserService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;

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
       break;
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
        progress.textContent = 'Importing data ' + percentLoaded + '%';
      }
    }
  }

  function handleFileSelect(evt) {
    // Reset progress indicator on new file selection.
    progress.style.width = '0%';
    progress.textContent = 'Importing data 0%';

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
      progress.textContent = 'Importing data 100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);

      console.log(e.target.result);
      CSVService.sendCSV(e.target.result);
    }

    // Read in the file as a text string.
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
  // REMOVE DUMMY DATA LATER //
  // hard coded event
  // will need to compare code stored in a session somehow which needs to be figured out
  var eventCodeHardCoded = 4783;
  // code entered in input field by Admin
  $scope.code = {
    thisCode: ''
  };
  $scope.eventCode = function(code){
    console.log("Event Code button clicked", code.thisCode);
    if (code.thisCode == eventCodeHardCoded) {
      $location.path('/checkInOut');
    }
    else {
      console.log('try again');
  }
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


}]);

myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  $scope.adultWaiver = {};
  $scope.submitAdultWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    $location.path("/waiver-photo");
  };

  $scope.youthWaiver = {};
  $scope.submitYouthWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    if ( waiverObj.noParent ) {
      $location.path("/override");
    }
    else {
      $location.path("/waiver-photo");
    }
  };

  $scope.photoWaiver = {};
  $scope.submitPhotoWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    if ( waiverObj.agreed ) {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

}]);

myApp.factory('CSVService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    console.log('Posting csv ', csvToPost);
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      serverResponseObject.response = response;
    });
  };

  return {
    sendCSV: sendCSV,
    serverResponseObject : serverResponseObject
  };
}]);

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
