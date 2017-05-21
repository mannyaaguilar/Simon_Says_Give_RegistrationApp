myApp.controller('CreateEventController', ['$scope', '$location','UserService', function($scope, $location, UserService) {

  $scope.redirect = UserService.redirect;
  $scope.message = '';
  $scope.event = {
    eventName: '',
    eventTeam: 'Minnesota',
    eventDescription: '',
    eventLocation: '',
    eventFromTime: '',
    eventUntilTime: '',
    eventUsername: ''
  };
  $scope.event.eventDate;

  $scope.createEvent = function(eventEntered) {
    console.log(eventEntered);



  }


}]);
