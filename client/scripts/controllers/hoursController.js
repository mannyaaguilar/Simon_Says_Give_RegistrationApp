myApp.controller('HoursController', ['$scope', '$mdDialog', '$http', 'UtilitiesService', 'UserService',
  function($scope, $mdDialog, $http, UtilitiesService, UserService) {

$scope.serverResponseObject = {};
$scope.redirect = UserService.redirect;

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

$scope.createHours = function(hoursEntered) {

  hoursToSend = angular.copy(hoursEntered);
  hoursToSend.hoursDate = UtilitiesService.formatDate(hoursToSend.hoursDate);
  hoursToSend.hoursFromTime = UtilitiesService.formatTime(hoursToSend.hoursFromTime);
  hoursToSend.hoursUntilTime = UtilitiesService.formatTime(hoursToSend.hoursUntilTime);

  postHours(hoursToSend);
};

postHours = function(hoursToPost) {
  $http.post('/ssgHours/add', hoursToPost)
  .then(function(response) {
  });
};


}]);
