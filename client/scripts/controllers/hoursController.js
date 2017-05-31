myApp.controller('HoursController', ['$scope', '$mdDialog', '$http', 'UtilitesService', 'UserService',
  function($scope, $mdDialog, $http, UtilitesService, UserService) {

var username;

$scope.serverResponseObject = {};
// Gets all records in the database
getHours = function(){
  var staff_name = {
    name: username
  };
  $http.post('/ssgHours/', staff_name).then(function(response) {
    $scope.serverResponseObject.allHours = response.data;
  });
};
getHours();

// Modal window that confirms record deletion
$scope.showConfirm = function(ev,ssgHours) {
  var confirm = $mdDialog.confirm()
        .title('Are you sure that you want to delete this record?')
        .textContent('')
        .ariaLabel('Delete this record')
        .targetEvent(ev)
        .ok('Delete')
        .cancel('Cancel');
  $mdDialog.show(confirm).then(function() {
    deleteHours(ssgHours);
  });
};
// Deletes a specific record
deleteHours = function(ssgHours) {
  $http.delete('/ssgHours/delete/' + ssgHours.id)
  .then(function(response) {
    getHours();
  });
};

$scope.hours = {
  hoursFromTime: '',
  hoursUntilTime: '',
  hoursDate: ''
};
var hoursToSend = {};
var message;

// calls function from factory that saves record into the database
$scope.createHours = function(hoursEntered) {
  console.log("hoursEntered: ", hoursEntered);
  hoursToSend = angular.copy(hoursEntered);

  // Format Date
  hoursToSend.hoursDate = UtilitesService.formatDate(hoursToSend.hoursDate);
  // Format month
  if ( hoursToSend.hoursDate[6] === "-" ) {
    hoursToSend.hoursDate = hoursToSend.hoursDate.slice(0, 5) + "0" + hoursToSend.hoursDate.slice(5);
  }
  // Format day
  if ( hoursToSend.hoursDate.length !== 10 ) {
    hoursToSend.hoursDate = hoursToSend.hoursDate.slice(0, 8) + "0" + hoursToSend.hoursDate.slice(8);
  }
  // Format Time
  // From Time
  hoursToSend.hoursFromTime = UtilitesService.formatTime(hoursToSend.hoursFromTime);
  if ( hoursToSend.hoursFromTime.length === 3 ) {
    hoursToSend.hoursFromTime = "0" + hoursToSend.hoursFromTime + "0";
  }
  else if ( (hoursToSend.hoursFromTime.length === 4) && (hoursToSend.hoursFromTime.slice(2, 4) === ":0") ) {
    hoursToSend.hoursFromTime = hoursToSend.hoursFromTime + "0";
  }
  else if ( (hoursToSend.hoursFromTime.length === 4) && (hoursToSend.hoursFromTime.slice(1, 2) === ":") ) {
    hoursToSend.hoursFromTime = "0" + hoursToSend.hoursFromTime;
  }
  // Until Time
  hoursToSend.hoursUntilTime = UtilitesService.formatTime(hoursToSend.hoursUntilTime);
  if ( hoursToSend.hoursUntilTime.length === 3 ) {
    hoursToSend.hoursUntilTime = "0" + hoursToSend.hoursUntilTime + "0";
  }
  else if ( (hoursToSend.hoursUntilTime.length === 4) && (hoursToSend.hoursUntilTime.slice(2, 4) === ":0") ) {
    hoursToSend.hoursUntilTime = hoursToSend.hoursUntilTime + "0";
  }
  else if ( (hoursToSend.hoursUntilTime.length === 4) && (hoursToSend.hoursUntilTime.slice(1, 2) === ":") ) {
    hoursToSend.hoursUntilTime = "0" + hoursToSend.hoursUntilTime;
  }

  postHours(hoursToSend);
};
// Sends hours information to server
postHours = function(hoursToPost) {
  console.log("hoursToPost: ", hoursToPost);
  $http.post('/ssgHours/add', hoursToPost)
  .then(function(response) {
    console.log("Response: ", response);
  });
};


}]);
