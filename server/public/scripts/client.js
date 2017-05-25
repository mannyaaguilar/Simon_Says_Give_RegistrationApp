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
    // All Events View
    .when('/displayEvents', {
      templateUrl: '/views/templates/events.html',
      controller: 'EventController',
      resolve: {
        getuser : ['UserService', function(UserService){
          return UserService.getuser('ADMIN');
        }]
      }
    })
    // All Events View
    .when('/viewEvent', {
      templateUrl: '/views/templates/viewEvent.html',
      controller: 'ViewEventController',
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

myApp.controller('AddAdminController', ['$scope', '$http', '$location', 'UserService', 'UtilitesService',
                function($scope, $http, $location, UserService, UtilitesService) {

  $scope.redirect = UserService.redirect;
  var message = '';
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
        message = $scope.adminUser.username + ' has been added as an Admin User.';
        showAlert(message);
      },
      function(response) {
        console.log('error');
        message = "Error adding admin. Please make sure admin doesn’t already exist."
        showAlert(message);
      });
    }
  }
}]);

myApp.controller('AdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("adminController Loaded");

$scope.redirect = UserService.redirect;
}]);

myApp.controller('checkInOutController', ['$scope', '$location', '$http', 'VolunteerService', 'UserService',
                  function($scope, $location, $http, VolunteerService, UserService) {

  $scope.eventObject = UserService.eventObject;
  console.log('In checkInOutController eventobject is', UserService.eventObject);

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
  var message;

  // calls function from factory that saves event into the database
  $scope.createEvent = function(eventEntered) {
    console.log('EVENT ENTERED', eventEntered);
    // validates and copies data to an object to send to the factory
    if (alphanumeric($scope.event.eventCode)) {
      if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
        eventToSend = angular.copy($scope.event);
        eventToSend.eventDate = UtilitesService.formatDate(eventToSend.eventDate);

        if (eventToSend.eventFromTime) {
          eventToSend.eventFromTime = UtilitesService.formatTime(eventToSend.eventFromTime);
        }
        if (eventToSend.eventUntilTime) {
          eventToSend.eventUntilTime = UtilitesService.formatTime(eventToSend.eventUntilTime);
        }
        // send information to factory
        console.log('EVENT TO SEND: ', eventToSend);
        EventService.postEvent(eventToSend);
      }
    } else {
      UtilitesService.showAlert('Please enter an alphanumeric code');
    }
  } // function createEvent()

  // Validates that the code entered is valid
  function alphanumeric(code) {
    if (code != '') {
      var letters = /^[0-9a-zA-Z]+$/;
      if(code.match(letters)) {
        return true;
      }
      else {
        return false;
      }
    }
  }

}]);

myApp.controller('EventController', ['$scope','$mdDialog','UserService','UtilitesService','EventService',
                function($scope,$mdDialog,UserService,UtilitesService,EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = EventService.serverResponseObject;

  EventService.getEvents();

  // Modal window that confirms event deletion
  $scope.showConfirm = function(ev,ssgEvent) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure that you want to delete this event?')
          .textContent('')
          .ariaLabel('Delete event')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      console.log('DELETING: ',ssgEvent);
      EventService.deleteEvent(ssgEvent);
      }, function() {
      console.log('Deletion cancelled');
    });
  };

  // Redirects to Event View
  $scope.viewEvent = function(ssgEvent) {
    console.log('view event clicked',ssgEvent);
    EventService.serverResponseObject.currentEvent = ssgEvent;
    UserService.redirect('/viewEvent');
  };

  // calls factory function to check out all active volunteers for the event
  $scope.logoutVolunteers = function(eventObject) {
    console.log("Event object ISSSS", eventObject);
    var eventParams = {};
    eventParams.eventCode = eventObject.event_code;
    eventParams.time = eventObject.event_until_time;
    console.log('Logging out volunteers for event:', eventParams);
    EventService.logoutVolunteersByEvent(eventParams);
  }

}]);

myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'UtilitesService','CSVService',
            function($scope, $http, $location, UserService, UtilitesService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;
  $scope.exportOption = '';
  $scope.datesEnabledValue = true;
  $scope.fromDate;
  $scope.toDate;
  var errorMessage = "";


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
        errorMessage = 'Invalid date Selection';
        UtilitesService.showAlert(errorMessage);
        return false;
      } else {
        return true;
      }
    } else {
      errorMessage = 'Invalid date Selection';
      UtilitesService.showAlert(errorMessage);
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
  $scope.eventObject = UserService.eventObject;

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
            $location.path('/displayEvents');
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
      $http.get('/ssgEvent/start/' + $scope.event.eventCode).then(function(response) {
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

myApp.controller('ViewEventController', ['$scope','$mdDialog','UserService','UtilitesService','EventService',
                function($scope,$mdDialog,UserService,UtilitesService,EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = {};
  $scope.serverResponseObject.currentEvent = EventService.serverResponseObject.currentEvent;
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

  // fills out input fields with current event information
  $scope.populate = function() {
    console.log('Current Event is:', EventService.serverResponseObject.currentEvent);
    if (EventService.serverResponseObject.currentEvent != undefined) {
      $scope.event.eventCode = EventService.serverResponseObject.currentEvent.event_code;
      $scope.event.eventName = EventService.serverResponseObject.currentEvent.event_name;
      $scope.event.eventDescription = EventService.serverResponseObject.currentEvent.event_description;
      $scope.event.eventLocation = EventService.serverResponseObject.currentEvent.event_location;
      $scope.event.eventFromTime = getTime(EventService.serverResponseObject.currentEvent.event_from_time);
      $scope.event.eventUntilTime = getTime(EventService.serverResponseObject.currentEvent.event_until_time);
      $scope.event.eventDate = getDate(EventService.serverResponseObject.currentEvent.event_date);
      $scope.event.eventTeam = EventService.serverResponseObject.currentEvent.event_team;
    }
  }

  // calling the function that fills out the edit form
  $scope.populate();

  // formats time to be displayed in input type="time"
  function getTime(timeString) {
    var hours = timeString.substr(0,2);
    var minutes = timeString.substr(3,2);
    var formattedTime = new Date(1900, 0, 1, hours, minutes, 0);
    return formattedTime
  }

  // formats date to be displayed in date picker
  function getDate(dateString) {
    var year = dateString.substr(0,4);
    var month = dateString.substr(5,2) - 1; // months are 0 based
    var day = dateString.substr(8,2);
    var formattedTime = new Date(year, month, day, 0, 0, 0);
    return formattedTime
  }

  // calls function from factory that saves changes to event into the database
  $scope.editEvent = function(eventEntered) {
    console.log('EDITING EVENT', eventEntered);
    // validates and copies data to an object to send to the factory
    if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
      eventToSend = angular.copy($scope.event);
      eventToSend.eventDate = UtilitesService.formatDate(eventToSend.eventDate);

      if (eventToSend.eventFromTime) {
        eventToSend.eventFromTime = UtilitesService.formatTime(eventToSend.eventFromTime);
      }
      if (eventToSend.eventUntilTime) {
        eventToSend.eventUntilTime = UtilitesService.formatTime(eventToSend.eventUntilTime);
      }
      // send information to factory
      console.log('EVENT TO SEND: ', eventToSend);
      EventService.updateEvent(eventToSend);
    }
  } // function updateEvent()

  // Checks out all remaining active volunteers
  $scope.logoutVolunteers = function(eventObject) {
    var eventParams = {};
    eventParams.eventCode = eventObject.eventCode;
    eventParams.time = UtilitesService.formatTime(eventObject.eventUntilTime);
    console.log('Logging out volunteers for event:', eventParams);
    EventService.logoutVolunteersByEvent(eventParams);
  }

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

myApp.factory('CSVService', ['$http','$mdDialog', function($http,$mdDialog){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Sends CSV file content to server
  sendCSV = function(csv) {
    var csvToPost = {};
    csvToPost.fileContent = csv;
    $http.post('/csv/upload', csvToPost).then(function(response) {
      console.log('Back from server after posting csv content', response);
      showAlert(response.data);
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
  };

  // Alert dialog to inform response to the user
  showAlert = function(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(message)
          .ariaLabel(message)
          .ok('Ok')
      );
    };

  return {
    sendCSV : sendCSV,
    requestVolunteerCSV : requestVolunteerCSV,
    requestHoursCSV :requestHoursCSV,
    serverResponseObject : serverResponseObject
  };
}]);

myApp.factory('EventService', ['$http','$mdDialog', function($http,$mdDialog){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Gets all events in the database
  getEvents = function(){
    console.log('in getEvents');
    $http.get('/ssgEvent/').then(function(response) {
      console.log('Back from the server with:', response);
      serverResponseObject.allEvents = response.data;
    });
  };

  // Sends event information to server
  postEvent = function(eventToPost) {
    console.log('Posting event ', eventToPost);
    $http.post('/ssgEvent/add', eventToPost).then(function(response) {
      console.log('Back from server after posting event', response);
      showAlert(response.data);
    });
  };

  // Deletes a specific event
  deleteEvent = function(ssgEvent) {
    console.log('Deleting event: ', ssgEvent);
    $http.delete('/ssgEvent/delete/' + ssgEvent.event_code).then(function(response) {
      getEvents();
    });
  };

  // Updates a specific event
  updateEvent = function(eventToUpdate) {
    console.log('Updating event: ', eventToUpdate);
    $http.put('/ssgEvent/update', eventToUpdate).then(function(response) {
      showAlert(response.data);
      getEvents();
    });
  };

  // Logs out all volunteers for a specific event
  logoutVolunteersByEvent = function(eventParams) {
    console.log('Logging out volunteers - event: ', eventParams);
    $http.put('/ssgEvent/logoutAll', eventParams).then(function(response) {
      showAlert('All active volunteers have been checked out.');
    });
  };

  // Alert dialog to inform response to the user
  showAlert = function(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(message)
          .ariaLabel(message)
          .ok('Ok')
      );
    };

  return {
    serverResponseObject : serverResponseObject,
    getEvents : getEvents,
    postEvent : postEvent,
    deleteEvent : deleteEvent,
    updateEvent : updateEvent,
    logoutVolunteersByEvent : logoutVolunteersByEvent
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

myApp.factory('UtilitesService', ['$http','$mdDialog', function($http,$mdDialog){
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

  showAlert = function(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(message)
          .ariaLabel(message)
          .ok('Ok')
      );
    };

return {
    formatDate: formatDate,
    formatTime: formatTime,
    showAlert: showAlert
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
    volunteer = {};
  };

 return {
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
   preregisteredVolunteerObj: preregisteredVolunteerObj,
   waiverObj: waiverObj,
   setEventTime: setEventTime
 };

}]); //end of VolunteerService
