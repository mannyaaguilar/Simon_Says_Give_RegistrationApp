myApp.controller('HoursController', ['$scope', '$mdDialog', '$http',
  function($scope, $mdDialog, $http) {

$scope.serverResponseObject = {};
// Gets all records in the database
getHours = function(){
  console.log('in getEvents');
  $http.get('/ssgEvent/').then(function(response) {
    $scope.serverResponseObject.allEvents = response.data;
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
  hoursToSend = angular.copy($scope.hours);
  hoursToSend.eventDate = UtilitesService.formatDate(hoursToSend.hoursDate);
  hoursToSend.hoursFromTime = UtilitesService.formatTime(hoursToSend.hoursFromTime);
  hoursToSend.hoursUntilTime = UtilitesService.formatTime(hoursToSend.hoursUntilTime);
  postHours(hoursToSend);
};
// Sends hours information to server
postHours = function(hoursToPost) {
  $http.post('/ssgHours/add', hoursToPost)
  .then(function(response) {
    getHours();
  });
};


}]);
