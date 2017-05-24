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
    // admin landing View
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
    // admin landing View
    .when('/createEvent', {
      templateUrl: '/views/templates/createEvent.html',
      controller: 'CreateEventController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // export to .csv view
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
        clearVolunteerObject: ['VolunteerService', function(VolunteerService) {
          return VolunteerService.clearVolunteerObject();
        }],
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
        }],
        setEventTime: ['VolunteerService', function(VolunteerService){
          return VolunteerService.setEventTime();
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

myApp.controller('AddAdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.redirect = UserService.redirect;
  $scope.message = '';
  $scope.adminUser = {
    username: '',
    password: '',
    role: 'ADMIN'
  };

  // Registers a new ADMIN user
  $scope.registerAdminUser = function() {
    if($scope.adminUser.username == '' || $scope.adminUser.password == '') {
      $scope.message = "Choose a username and password.";
    } else {
      console.log('sending to server...', $scope.adminUser);
      $http.post('/register', $scope.adminUser).then(function(response) {
        console.log('success');
        $scope.message = 'User ' + $scope.adminUser.username + ' has been added as an Admin User.'
      },
      function(response) {
        console.log('error');
        $scope.message = "Please try again."
      });
    }
  }
}]);

myApp.controller('AdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("adminController Loaded");

$scope.redirect = UserService.redirect;
}]);

myApp.controller('checkInOutController', ['$scope', '$location', '$http', 'VolunteerService', function($scope, $location, $http, VolunteerService) {

  // when check in btn clicked, get for preregistered volunteers triggered and routes to volunteer view
  $scope.checkIn = function(){
    console.log('inside checkIn function');
    // VolunteerService.preregisteredVolunteer();
    $location.path('/volunteer');
  };
  // when check out btn clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);

myApp.controller('CheckoutController', ['$scope', '$location', '$http', 'UtilitesService', function($scope, $location, $http, UtilitesService) {

$scope.formatTime = UtilitesService.formatTime;

//object for input items to bind to
//NEED TO UPDATE, BRING IN VOLUNTEER OBJECT FROM FACTORY
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to store search results
$scope.volunteerList = [];

//Array to store selected volunteers (by ID) to checkout
//CURRENTLY HARDCODED - NEED TO CHANGE TO EMPTY ARRAY
$scope.checkoutList = [1, 2, 3, 4];
// $scope.checkoutList = {
//   volunteer:''
// };

//Connected to Search button - take inputs and check for records in database,
//appends results to DOM
$scope.search = function(volunteer) {
  $scope.getVolunteers(volunteer);
  $scope.success = true;
};

//http post to server - takes response and sets it equal to the volunteerList array
$scope.getVolunteers = function(volunteer) {
  console.log('volunteerObject in http: ', $scope.volunteerObject);
  console.log('logging volunteer in htpp function', volunteer);
  $http.post('/checkout', volunteer).then(function(response){
    $scope.volunteerList = response.data;
    console.log('logging checkout response: ', response);
    });
};

$scope.checkout = function(checkoutList) {
  console.log('logging checkoutList: ', $scope.checkoutList);
  $scope.checkoutVolunteers(checkoutList);
  $scope.changeView();
};

//PUT Route that updates the checkout time of chosen volunteer record(s)
$scope.checkoutVolunteers = function(volunteers) {
  console.log('logging volunteers in checkoutVolunteers: ', volunteers);
  var timeToFormat = new Date();
  var checkoutTime = $scope.formatTime(timeToFormat);

  $http.put('/checkout/' + volunteers + '/' + checkoutTime).then(function(response){
    console.log(response);
    });
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

myApp.controller('CreateEventController', ['$scope', '$location','UserService', 'UtilitesService','EventService',
                function($scope, $location, UserService, UtilitesService, EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = EventService.serverResponseObject;
  $scope.event = {
    eventCode: '',
    eventName: '',
    eventTeam: '',
    eventDescription: '',
    eventLocation: '',
    eventFromTime: '',
    eventUntilTime: '',
  };
  $scope.event.eventDate;
  var eventToSend = {};

  // calls function from factory that saves event into the database
  $scope.createEvent = function(eventEntered) {
    console.log('EVENT ENTERED', eventEntered);
    console.log('event.eventCode is',$scope.event.eventCode);
    console.log('event.eventName is',$scope.event.eventName);
    console.log('event.eventTeam is',$scope.event.eventTeam);
    console.log('event.eventDate is',$scope.event.eventDate);
    // validates and copies data to an object to send to the factory
    if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
      console.log('inside if');
      eventToSend.eventCode = angular.copy($scope.event.eventCode);
      eventToSend.eventName = angular.copy($scope.event.eventName);
      eventToSend.eventTeam = angular.copy($scope.event.eventTeam);
      eventToSend.eventDate = UtilitesService.formatDate(angular.copy($scope.event.eventDate));
      eventToSend.eventDescription = angular.copy($scope.event.eventDescription);
      eventToSend.eventLocation = angular.copy($scope.event.eventLocation);

      console.log($scope.event.eventFromTime);
      if ($scope.event.eventFromTime) {
        eventToSend.eventFromTime = UtilitesService.formatTime(angular.copy($scope.event.eventFromTime));
      }
      if ($scope.event.eventUntilTime) {
        eventToSend.eventUntilTime = UtilitesService.formatTime(angular.copy($scope.event.eventUntilTime));
      }
      // send information to factory
      console.log('EVENT TO SEND: ', eventToSend);
      EventService.postEvent(eventToSend);
      
    }
  } // function createEvent()


}]);

myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'CSVService', function($scope, $http, $location, UserService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;
  $scope.exportOption = '';
  $scope.datesEnabledValue = true;
  $scope.errorMessage = "";
  $scope.fromDate;
  $scope.toDate;

  console.log('ExportController loaded');

  // prepares information (parameter dates) and calls function in factory
  $scope.exportInformation = function(option) {
    console.log('Export Information clicked, exporting: ', option);
    data = {
      fromDate : new Date(),
      toDate : new Date()
    };
    // checks if option selected was hours and prepares data object of parameters
    if ($scope.exportOption === 'hours'){
      console.log('From Date', $scope.fromDate);
      console.log('To Date', $scope.toDate);
      data.fromDate = $scope.fromDate;
      data.toDate = $scope.toDate;
      if (validDates (data.fromDate, data.toDate)) {
        // calls function in factory that requests data from the server
        CSVService.requestHoursCSV(data);
      }
    } else {
      CSVService.requestVolunteerCSV();
    }
  };

  // validates the date selection
  function validDates(fromDate, toDate) {
    if (fromDate && toDate) {
      if(toDate < fromDate) {
        $scope.errorMessage = 'Invalid date Selection';
        return false;
      } else {
        return true;
      }
    } else {
      $scope.errorMessage = 'Invalid date Selection';
      return false;
    }
  };

  // enables/disables datepickers depending on option selected
  $scope.toggleEnableDates = function() {
    if ($scope.exportOption === 'hours'){
      if ($scope.datesEnabledValue) {
        $scope.datesEnabledValue = false;
      }
    } else {
      $scope.datesEnabledValue = true;
    }
  };

}]);

myApp.controller('HeaderController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.redirect = UserService.redirect;
  $scope.logout = UserService.logout;

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

myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.event = {
    eventCode: ''
  };
  $scope.adminMessage = '';
  $scope.eventMessage = '';

  // Logins Admin user
  $scope.login = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      $scope.adminMessage = "Enter your username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to admin page');
          if (response.data.role === 'ADMIN') {
            $location.path('/admin');
          } else {
            $location.path('/checkInOut');
          }
        } else {
          console.log('failure: ', response);
          $scope.adminMessage = "Invalid username and password combination.";
        }
      });
    }
  };

  // Starts event based on event code
  $scope.startEvent = function() {
    console.log('startEvent clicked:', $scope.event.eventCode);
    if($scope.event.eventCode == '') {
      $scope.eventMessage = "Enter an event code!";
    } else {
      console.log('sending to server...', $scope.event);
      $http.get('/newEvent/start/' + $scope.event.eventCode).then(function(response) {
        console.log(response);
        if(response.data.event_code) {
          console.log('success: ', response.data);
          UserService.eventObject.eventCode = response.data.event_code;
          UserService.eventObject.eventName = response.data.event_name;
          console.log('EVENT CODE', UserService.eventObject.eventCode);
          console.log('EVENT NAME', UserService.eventObject.eventName);
          // console.log('EVENT CODE', response.data.event_code);
          // console.log('EVENT NAME', response.data.event_name);
          $location.path('/checkInOut');
        } else {
          console.log('failure: ', response);
          $scope.eventMessage = "Invalid event code.";
        }
      });
    }
  }

}]);

myApp.controller('OverrideController', ['$window','$scope', '$http', '$location', 'UserService', function($window, $scope, $http, $location, UserService) {
console.log('OverrideController loaded');
$scope.redirect = UserService.redirect;

var adminCodeHardCoded = 1234;
$scope.adminCode = {
  thisCode: ''
};
$scope.message = '';

//function to send user back to the appropriate waiver view
$scope.waiverView = function() {
  console.log('need to add appropriate $location logic');
  $window.history.back();
};
//function to validate admin code and bring user to confirmation view
$scope.finish = function(adminCode) {
  if (adminCode.thisCode == false) {
    $scope.message = 'Please enter admin code';
  }
  else if (adminCode.thisCode == adminCodeHardCoded) {
    $location.path('/confirmation');
  }
  else {
    $scope.message = 'Please try again';
  }
};
}]);

myApp.controller('startEventController', ['$scope', '$location', function($scope, $location) {
  // REMOVE DUMMY DATA LATER //
  // hard coded event
  // will need to compare code stored in a session somehow which needs to be figured out
  var eventCodeHardCoded = 1234;
  // code entered in input field by Admin
  $scope.code = {
    thisCode: ''
  };
  $scope.message = '';

  $scope.eventCode = function(code) {
    if(code.thisCode == false) {
      $scope.message = 'Please enter an event code';
    }
    else if (code.thisCode == eventCodeHardCoded){
      $location.path('checkInOut');
    }
    else {
        console.log(code.thisCode);
        $scope.message = 'Please try again.';
    }
  };
}]);

myApp.controller('UserController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

}]);

myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', 'VolunteerService', 'UtilitesService', function($scope, $http, $location, UserService, VolunteerService, UtilitesService){
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteer = VolunteerService.volunteer;
$scope.preregisteredVolunteer = VolunteerService.preregisteredVolunteer;

var birtdateToDB;

$scope.volunteer = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: true,
    birthdate: '',
    // birthdate: '3000-12-01',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

$scope.formatdob = function() {
  console.log("formatdob", $scope.volunteer.birthdate);
  if ( $scope.volunteer.birthdate) {
    birtdateToDB = UtilitesService.formatDate(angular.copy($scope.volunteer.birthdate));
    console.log('birthdate', birtdateToDB);
  }
  else {
    $scope.volunteer.birthdate = '1900-01-01';
    console.log("default birthdate", birtdateToDB);
  }
};

$scope.cancel = function(){
  $location.path('/checkInOut');
};

//sets date on datepicker to 8 years back for the convenience of user
$scope.minmaxDate = function() {
    this.myDate = new Date();
    this.maxDate = new Date(
    this.myDate.getFullYear() - 8,
    this.myDate.getMonth(),
    this.myDate.getDate()
  );
};

// $scope.volunteerData = function(){
// VolunteerService.volunteerToDB = angular.copy($scope.volunteer);
// console.log("INSIDE COPY volunteerToDB", VolunteerService.volunteerToDB );
// };

$scope.minmaxDate();
// $scope.volunteerData();
// VolunteerService.postNewVolunteer();
}]);//end VolunteerController

myApp.controller('WaiverController', ['$scope', '$http', '$location', 'VolunteerService', function($scope, $http, $location, VolunteerService) {

console.log("WaiverController loaded!");
    $scope.message = '';

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  // var todaysDate = new Date();
  //
  // $scope.waiverObj = {
  //   //Adult waiver
  //   volunteerIndex: "",
  //   dateTopAdult: todaysDate,
  //   nameTopAdult: "",
  //   agreedAdult: false,
  //   nameBottomAdult: "",
  //   dateBottomAdult: todaysDate,
  //   //Youth waiver
  //   dateTopYouth: todaysDate,
  //   nameTopYouth: "",
  //   agreedYouth: false,
  //   nameBottomYouth: "",
  //   dateBottomYouth: todaysDate,
  //   noParentYouth: "",
  //   dateBottomVolYouth: todaysDate,
  //   guardianEmailYouth: "",
  //   guardianTopYouth: "",
  //   guardianBottomYouth: "",
  //   dateBottomGuardYouth: todaysDate,
  //   //Photo waiver
  //   agreedPhoto: false,
  //   nameBottomPhoto: "",
  //   dateBottomPhoto: todaysDate,
  //   dateBottomVolPhoto: todaysDate,
  //   guardianBottomPhoto: "",
  //   dateBottomGuardPhoto: todaysDate
  // };

  $scope.waiverObj = VolunteerService.waiverObj;

  $scope.submitAdultWaiver = function() {
    console.log("XXcurrent waiverObj: ", $scope.waiverObj);
    var filledOut;

    filledOut = $scope.waiverObj.dateTopAdult &&
                $scope.waiverObj.nameTopAdult &&
                $scope.waiverObj.agreedAdult &&
                $scope.waiverObj.nameBottomAdult &&
                $scope.waiverObj.dateBottomAdult;

    var signature = $scope.waiverObj.nameBottomAdult;
    checkAdultSignFormat(signature);

    function checkAdultSignFormat(signature) {
      if (filledOut &&
          signature.charAt(0) === '/' &&
          signature.charAt(signature.length -1) === '/') {
            $location.path("/waiver-photo");
      }
      else if (filledOut &&
        (signature.charAt(0) !== '/' || signature.charAt(signature.length -1) !== '/' )) {
          $scope.message = 'Please put name between slashes';
        }
      else {
        $scope.message = 'Please fill out all highlighted fields';
      }
    } // end checkSignatureFormat
  }; // end submitAdultWaiver

  $scope.submitYouthWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    var noParentAll,
        parentAll,
        filledOut;

    noParentAll = $scope.waiverObj.noParentYouth &&
                  $scope.waiverObj.nameBottomYouth &&
                  $scope.waiverObj.dateBottomVolYouth &&
                  $scope.waiverObj.guardianEmailYouth;

    parentAll = $scope.waiverObj.dateTopYouth &&
                $scope.waiverObj.nameTopYouth &&
                $scope.waiverObj.guardianTopYouth &&
                $scope.waiverObj.agreedYouth &&
                $scope.waiverObj.nameBottomYouth &&
                $scope.waiverObj.dateBottomVolYouth &&
                $scope.waiverObj.guardianBottomYouth &&
                $scope.waiverObj.dateBottomGuardYouth;

    filledOut = noParentAll || parentAll;

    var youthSignature = $scope.waiverObj.nameBottomYouth;
    var guardianSignature = $scope.waiverObj.guardianBottomYouth;



    // NEEDS TO BE FINISHED
    // function checkYouthSignFormat(youthSignature, guardianSignature) {
    //   if (filledOut &&
    //       youthSignature.charAt(0) === '/' &&
    //       youthSignature.charAt(youthSignature.length -1) === '/') {
    //         $location.path("/override");
    //   }
    //   else if (filledOut &&
    //     (signature.charAt(0) !== '/' || signature.charAt(signature.length -1) !== '/' )) {
    //       $scope.message = 'Please put name between slashes';
    //     }
    //   else {
    //     $scope.message = 'Please fill out all highlighted fields';
    //   }
    // } // end checkSignatureFormat




    if ( filledOut ) {
      if ( noParentAll ) {
        $location.path("/override");
      }
      else if ( parentAll ) {
        $location.path("/waiver-photo");
      }
    }
    else {
      $scope.message = 'Please complete all highlighted fields';
    }
  }; // end submitYouthWaiver

  $scope.submitPhotoWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);

    if ( $scope.waiverObj.agreedPhoto ) {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

  $scope.declineWaiver = function() {
    $location.path("/override");
  };

}]);

myApp.factory('CSVService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    // console.log('Posting csv ', csvToPost);
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      serverResponseObject.response = response;
    });
  };

  // Requests CSV file from server
  requestVolunteerCSV = function() {
    console.log('Getting volunteer .csv');
    $http.get('/csv/export/volunteer').then(function(response) {
      console.log('Back from server after getting csv content');
      // opens the route - downloads the file
      window.open('/csv/export/volunteer');
    });
  };

  // Requests CSV file from server
  requestHoursCSV = function(data) {
    console.log('Getting hours .csv ');
    console.log('Data: ', data);
    var formattedFromDate = formatDate(data.fromDate);
    var formattedToDate = formatDate(data.toDate);
    $http.get('/csv/export/hours/' + formattedFromDate + '/' + formattedToDate).then(function(response) {
      console.log('Back from server after getting csv content',response);
      // opens the route - downloads the file
      var route = '/csv/export/hours/' + formattedFromDate + '/' + formattedToDate;
      window.open(route);
    });
  };

  // Formats date to DB format
  formatDate = function(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var formattedDate = curr_year + "-" + curr_month + "-" + curr_date;
    return formattedDate;
  }

  return {
    sendCSV : sendCSV,
    requestVolunteerCSV : requestVolunteerCSV,
    requestHoursCSV :requestHoursCSV,
    serverResponseObject : serverResponseObject
  };
}]);

myApp.factory('EventService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends event information to server
  postEvent = function(eventToPost) {
    console.log('Posting event ', eventToPost);
    $http.post('/newEvent/add', eventToPost).then(function(response) {
      console.log('Back from server after posting event', response);
      serverResponseObject.response = response;
    });
  };

  return {
    serverResponseObject : serverResponseObject,
    postEvent : postEvent

  };
}]);


myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};
  var eventObject = {};

  // Redirects to the view received as a parameter
  function redirect(page){
    console.log('in page navigation', page);
    $location.url(page);
  }

  return {
    userObject : userObject,
    eventObject : eventObject,
    redirect : redirect,

    getuser : function(adminRequired){
      $http.get('/user').then(function(response) {
        console.log('logging response.data in get user: ', response.data);
          // validates that the user has a current session and is allowed to see
          // current view
          if (adminRequired) {
            if(response.data.username && (response.data.role === adminRequired)) {
                // user has a curret session on the server
                userObject.id = response.data.id;
                userObject.userName = response.data.username;
                console.log('User userName, id: ', userObject.userName, userObject.id);
            } else {
                // user has no session or current view access is not permitted, bounce them back to the login page
                $location.path('/login');
            }
          } else {
            if(response.data.username) {
                // user has a curret session on the server
                userObject.id = response.data.id;
                userObject.userName = response.data.username;
                console.log('User userName, id: ', userObject.userName, userObject.id);
            } else {
                // user has no session, bounce them back to the login page
                $location.path('/login');
            }
          }
      });
    },

    // Checks that event code has been entered otherwise goes back to login view
    checkEvent : function(){
      console.log("inside checkEvent");
      if(!eventObject.eventCode) {
        redirect('/login');
      }
    },

    // Logs out user
    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          redirect('/login');
        });
    }
  };
}]);

myApp.factory('UtilitesService', ['$http', function($http){
console.log('UtilitesService loaded');

let todaysDate = new Date();

  formatDate = function(date) {
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var formattedDate = curr_year + "-" + curr_month + "-" + curr_date;
    return formattedDate;
  };

  formatTime = function(time) {
      var curr_hour = time.getHours();
      var curr_minutes = time.getMinutes();
      var formattedTime = curr_hour + ":" + curr_minutes;
      return formattedTime;
    };

return {
    formatDate: formatDate,
    formatTime: formatTime
  };


}]);//end of UtilitesService

myApp.factory('VolunteerService', ['$http', '$location', 'UserService', 'UtilitesService', function($http, $location, UserService, UtilitesService){
console.log("Volunteer Service loaded");

  var preregisteredVolunteerObj = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: '',
    birthdate: '',
    // birthdate: '3000-12-01',
    has_signed_waiver: '',
    has_allowed_photos: '',
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

  var todaysDate = new Date();

  var waiverObj = {
    //Adult waiver
    volunteerID: "",
    dateTopAdult: todaysDate,
    nameTopAdult: "",
    agreedAdult: false,
    nameBottomAdult: "",
    dateBottomAdult: todaysDate,
    //Youth waiver
    dateTopYouth: todaysDate,
    nameTopYouth: "",
    agreedYouth: false,
    nameBottomYouth: "",
    dateBottomYouth: todaysDate,
    noParentYouth: "",
    dateBottomVolYouth: todaysDate,
    guardianEmailYouth: "",
    guardianTopYouth: "",
    guardianBottomYouth: "",
    dateBottomGuardYouth: todaysDate,
    //Photo waiver
    agreedPhoto: false,
    nameBottomPhoto: "",
    dateBottomPhoto: todaysDate,
    dateBottomVolPhoto: todaysDate,
    guardianBottomPhoto: "",
    dateBottomGuardPhoto: todaysDate
  };


  preregisteredVolunteer = function(volunteer){
      console.log("inside preregisteredVolunteer function", volunteer );
      $http.post('/volunteer/initial', volunteer)
      // $http.post('/volunteer')
      .then(function(response){
        console.log('RESPONSE: ', response.data[0]);
        console.log('RESPONSE: ', response.data[0].id);

        // volunteerToDB = angular.copy(response.data)
        // console.log('VOLUNTEERTODB', volunteerToDB);
        preregisteredVolunteerObj.email = response.data[0].email;
        preregisteredVolunteerObj.first_name = response.data[0].first_name;
        preregisteredVolunteerObj.last_name = response.data[0].last_name;
        preregisteredVolunteerObj.under_18 = response.data[0].under_18;
        preregisteredVolunteerObj.birthdate = response.data[0].birthdate;
        preregisteredVolunteerObj.has_signed_waiver = response.data[0].has_signed_waiver;
        preregisteredVolunteerObj.has_allowed_photos = response.data[0].has_allowed_photos;
        preregisteredVolunteerObj.parent_email = response.data[0].parent_email;
        preregisteredVolunteerObj.id = response.data[0].id;

        if(response.data[0]){
          console.log("found");
          if(preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-youth');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-adult');
          } else if
            (preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else {
            $location.path('/confirmation');
          }
        }
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteerObj);
      });
      // return preregisteredVolunteerObj;
    };


    setEventTime = function(){
          console.log("in setEventTime!");
          updateWaiver();
    };



    updateWaiver = function(){
      console.log("in updateWaiver!");
        var checkInTime = new Date();
        waiverObj.event_id = UserService.eventObject.eventCode;
        waiverObj.time_in = UtilitesService.formatTime(checkInTime);
        waiverObj.date = UtilitesService.formatDate(checkInTime);
        waiverObj.volunteerID = preregisteredVolunteerObj.id;
        $http.post('/volunteer/complete', waiverObj)
        .then(function(response){
          console.log("in .then from updateWaiver! ", response);
          return response;
        });
      };

  clearVolunteerObject = function(){
    preregisteredVolunteerObj.email = '';
    preregisteredVolunteerObj.first_name = '';
    preregisteredVolunteerObj.last_name = '';
    preregisteredVolunteerObj.under_18 = '';
    preregisteredVolunteerObj.birthdate = '';
    preregisteredVolunteerObj.has_signed_waiver = '';
    preregisteredVolunteerObj.has_allowed_photos = '';
    preregisteredVolunteerObj.parent_email = '';
    // preregisteredVolunteerObj.address1 = '';
    // preregisteredVolunteerObj.address2 = '';
    // preregisteredVolunteerObj.city = '';
    // preregisteredVolunteerObj.state = '';
    // preregisteredVolunteerObj.zip = '';
    // preregisteredVolunteerObj.birthdate = '3000-12-01';
    // preregisteredVolunteerObj.validation_required = false;
    // preregisteredVolunteerObj.school = '';
    // preregisteredVolunteerObj.employer = '';
    // preregisteredVolunteerObj.employer_match = false;
    waiverObj.volunteerID = "";
    waiverObj.dateTopAdult = todaysDate;
    waiverObj.nameTopAdult = "";
    waiverObj.agreedAdult = false;
    waiverObj.nameBottomAdult = "";
    waiverObj.dateBottomAdult = todaysDate;
    waiverObj.dateTopYouth = todaysDate;
    waiverObj.nameTopYouth = "";
    waiverObj.agreedYouth = false;
    waiverObj.nameBottomYouth = "";
    waiverObj.dateBottomYouth = todaysDate;
    waiverObj.noParentYouth = "";
    waiverObj.dateBottomVolYouth = todaysDate;
    waiverObj.guardianEmailYouth = "";
    waiverObj.guardianTopYouth = "";
    waiverObj.guardianBottomYouth = "";
    waiverObj.dateBottomGuardYouth = todaysDate;
    waiverObj.agreedPhoto = false;
    waiverObj.nameBottomPhoto = "";
    waiverObj.dateBottomPhoto = todaysDate;
    waiverObj.dateBottomVolPhoto = todaysDate;
    waiverObj.guardianBottomPhoto = "";
    waiverObj.dateBottomGuardPhoto = todaysDate;
    UserService.userObject.id = "";
    UserService.userObject.userName = "";
  };

 return {
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
   preregisteredVolunteerObj: preregisteredVolunteerObj,
   waiverObj: waiverObj,
   setEventTime: setEventTime
 };

}]); //end of VolunteerService
