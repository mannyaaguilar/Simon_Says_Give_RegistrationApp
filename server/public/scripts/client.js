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
    .when('/admin', {
      templateUrl: '/views/templates/admin.html',
      controller: 'AdminController',
    })
    .when('/export', {
      templateUrl: '/views/templates/export.html',
      controller: 'ExportController',
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

myApp.controller('checkInOutController', ['$scope', '$location', '$http', 'VolunteerService', function($scope, $location, $http, VolunteerService) {

  // when check in btn clicked, get for preregistered volunteers triggered and routes to volunteer view
  $scope.checkIn = function(){
    console.log('inside checkIn function');
    VolunteerService.preregisteredVolunteer();
    $location.path('/volunteer');
  };
  // when check out btn clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);

myApp.controller('CheckoutController', ['$scope', '$location', '$http', function($scope, $location, $http) {

//object for input items to bind to
//NEED TO UPDATE, BRING IN VOLUNTEER OBJECT FROM FACTORY
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to store search results
$scope.volunteerList = [];

//Array to store selected volunteers to checkout
$scope.checkoutList = {
  volunteer:''
};

//Connected to Search button - take inputs and check for records in database,
// append results to DOM
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

$scope.checkout = function() {
  //NEED TO ADD: PUT ROUTE to add checkout time to chosen volunteer hours record
  // checkoutTime = new Date();
  console.log('Logging checkout time on click: ', new Date());
  console.log('logging checkoutList: ', $scope.checkoutList);
  $scope.checkoutVolunteers();

  //changes view to confirmation page:
  $scope.changeView();
};

//PUT Route that updates the checkout time of chosen volunteer record(s)
$scope.checkoutVolunteers = function() {
  $http.put('/checkout').then(function(response){
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
  }

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
    $scope.message = 'Please try again.';
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
$scope.volunteerCheckIn = VolunteerService.volunteerCheckIn;
$scope.volunteer = VolunteerService.volunteer;
// VolunteerService.postNewVolunteer();
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
  console.log("1 formatdob", $scope.volunteer.birthdate);
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

//***

// $scope.initial = {
//   dob: new Date()
// };
// var stringDate = toString()
// $scope.formatdob = function(initial){
// console.log(typeof(inital));
// console.log("Initial DOB: ", initial);
// var formattedDOB = $scope.initial.slice(0, 10);
// console.log(formattedDOB);
// };
$scope.volunteer = {
  email: '',
  first_name: '',
  last_name: '',
  under_18: true,
  birthdate: '3000-12-01'
};
$scope.minmaxDate = function() {
  this.myDate = new Date();
  // console.log(this.myDate);

  this.maxDate = new Date(
    this.myDate.getFullYear() - 8,
    this.myDate.getMonth(),
    this.myDate.getDate()
  );
  // console.log(this.maxDate);
};

$scope.volunteerData = function(){
VolunteerService.volunteerToDB.email = angular.copy($scope.volunteer.email);
VolunteerService.volunteerToDB.first_name = angular.copy($scope.volunteer.first_name);
VolunteerService.volunteerToDB.last_name = angular.copy($scope.volunteer.last_name);
VolunteerService.volunteerToDB.under_18 = angular.copy($scope.volunteer.under_18);
VolunteerService.volunteerToDB.birtdateToDB = angular.copy($scope.volunteer.birthdate);
};

$scope.minmaxDate();
$scope.volunteerData();
}]);//end VolunteerController

myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  let todaysDate = new Date();

  $scope.waiverObj = {
    //Adult waiver
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

  //BEGIN TIMER STUFF
  let inDate;

  const NUM_MILIS_IN_HOUR = 3600000;
  $scope.setCheckIn = function() {
    inDate = new Date();
  };
  $scope.captureTime = function() {
    let newDate,
        inMonth,
        inDay,
        inYear,
        inHour,
        inMinute,
        prettyInDate,
        newMonth,
        newDay,
        newYear,
        newHour,
        newMinute,
        prettyNewDate,
        millisJustVolunteered,
        hoursJustVolunteered;

    console.log("inDate: ", inDate);
    inMonth = inDate.getMonth();
    inDay = inDate.getDate();
    inYear = inDate.getFullYear();
    inHour = inDate.getHours();
    inMinute = inDate.getMinutes();
    prettyInDate = inMonth + "/" + inDay + "/" + inYear +
      ", at " + inHour + ":" + inMinute;
    console.log("prettyInDate: ", prettyInDate);

    newDate = new Date();
    console.log("newDate: ", newDate);
    newMonth = newDate.getMonth();
    newDay = newDate.getDate();
    newYear = newDate.getFullYear();
    newHour = newDate.getHours();
    newMinute = newDate.getMinutes();
    prettyNewDate = newMonth + "/" + newDay + "/" + newYear +
      ", at " + newHour + ":" + newMinute;
    console.log("prettyNewDate: ", prettyNewDate);

    millisJustVolunteered = newDate - inDate;
    hoursJustVolunteered = millisJustVolunteered / NUM_MILIS_IN_HOUR;
    console.log("hoursJustVolunteered: ", hoursJustVolunteered);
  };
  //END TIMER STUFF

  $scope.submitAdultWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    let filledOut;

    filledOut = $scope.waiverObj.dateTopAdult &&
                $scope.waiverObj.nameTopAdult &&
                $scope.waiverObj.agreedAdult &&
                $scope.waiverObj.nameBottomAdult &&
                $scope.waiverObj.dateBottomAdult;

    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.submitYouthWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    let noParentAll,
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

    if ( filledOut ) {
      if ( noParentAll ) {
        $location.path("/override");
      }
      else if ( parentAll ) {
        $location.path("/waiver-photo");
      }
      else {
        alert("Weird error!");
      }
    }
    else {
      alert("Please complete all fields");
    }
  };

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

return {
    formatDate: formatDate
  };


}]);//end of UtilitesService

myApp.factory('VolunteerService', ['$http', '$location', function($http, $location){
console.log("Volunteer Service loaded");

var volunteerToDB = {
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
    has_signed_waiver: false,
    has_allowed_photos: false,
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

  var preregisteredVolunteer = {
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

  var newVolunteer = [];

  preregisteredVolunteer = function(){
      console.log("inside preregisteredVolunteer function");
      $http.get('/volunteer')
      .then(function(response){
        preregisteredVolunteer = response.data;
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteer);
      });
    };
//volunteerCheckIn takes in what was entered on volunteer.html and first compares it to volunteeers already on the db.
//if they already exist it checks to see status of each waiver and directs them appropriately. If volunteer is not
//already on the database it posts them to the database and directs them to the general waiver view.
  volunteerCheckIn = function(volunteer){
  console.log("volunteerCheckIn function accessed Email:", volunteer.email + " " + "First Name:", volunteer.first_name + " " + "Last Name:", volunteer.last_name);
    for(i=0; i < preregisteredVolunteer.length; i++){
      // console.log("preregisteredVolunteer.email: ", preregisteredVolunteer[i].email);
      if(volunteer.email === preregisteredVolunteer[i].email && volunteer.first_name === preregisteredVolunteer[i].first_name && volunteer.last_name === preregisteredVolunteer[i].last_name){
        console.log("MATCH FOUND");
            if(preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_signed_waiver === false){
              $location.path('/waiver-youth');
            } else if
              (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_signed_waiver === false){
              $location.path('/waiver-adult');
            } else if
              (preregisteredVolunteer[i].under_18 === true && preregisteredVolunteer[i].has_allowed_photos === false){
              $location.path('/waiver-photo');
            } else if
              (preregisteredVolunteer[i].under_18 === false && preregisteredVolunteer[i].has_allowed_photos === false){
              $location.path('/waiver-photo');
            } else {
              $location.path('/confirmation');
            }
      } else {
        newVolunteer.push(volunteer);
        console.log("New Volunteer Inside: ", newVolunteer);
        // newVolunteer = angular.copy(volunteer);
      }
    }//end of for loop

  };//end of volunteerCheckIn

  // .then(function(newVolunteer){
  //     $http.post('/volunteer', newVolunteer).then(function(){
  //       if(volunteer.under_18 === true){
  //         console.log("General Waiver Needed- youth", volunteer.birthdate);
  //         $location.path('/waiver-youth');
  //       } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
  //         console.log("Adult General Waiver & Photo Waiver on record");
  //         $location.path('/confirmation');
  //       } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
  //         console.log("General Waiver on record, just need Photo Waiver");
  //         $location.path('/waiver-photo');
  //       } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
  //         console.log("Photo Waiver on record, just need General Waiver");
  //         $location.path('/waiver-adult');
  //       } else {
  //         $location.path('/waiver-adult');
  //       }
  //     });
  //   });

  clearVolunteerObject = function(){
    volunteer = {};
  };

 return {
   volunteerToDB: volunteerToDB,
   volunteerCheckIn: volunteerCheckIn,
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
  //  postNewVolunteer: postNewVolunteer
 };

}]); //end of VolunteerService
