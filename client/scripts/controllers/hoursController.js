myApp.controller('HoursController', ['$scope', '$mdDialog', '$http', 'UtilitesService', 'UserService',
  function($scope, $mdDialog, $http, UtilitesService, UserService) {

$scope.serverResponseObject = {};
// Gets all records in the database
getHours = function(){
  $http.get('/ssgHours/')
  .then(function(response) {
    var holderArray = angular.copy(response.data);
    for (i = 0; i < holderArray.length; i++) {
      holderArray[i].date = holderArray[i].date.slice(0, 10);
      holderArray[i].time_in = holderArray[i].time_in.slice(0, 5);
      holderArray[i].time_out = holderArray[i].time_out.slice(0, 5);
    }
    $scope.serverResponseObject.allHours = angular.copy(holderArray);
  });
};
getHours();

// Modal window that confirms record deletion
$scope.showConfirm = function(ev, ssgHours) {
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
  console.log("the id: ", ssgHours);
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

  hoursToSend = angular.copy(hoursEntered);
  hoursToSend.hoursDate = UtilitesService.formatDate(hoursToSend.hoursDate);
  hoursToSend.hoursFromTime = UtilitesService.formatTime(hoursToSend.hoursFromTime);
  hoursToSend.hoursUntilTime = UtilitesService.formatTime(hoursToSend.hoursUntilTime);

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
