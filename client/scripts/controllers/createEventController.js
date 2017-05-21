myApp.controller('CreateEventController', ['$scope', '$location','UserService', 'UtilitesService','EventService',
                function($scope, $location, UserService, UtilitesService, EventService) {

  $scope.redirect = UserService.redirect;
  $scope.message = '';
  $scope.event = {
    eventName: '',
    eventTeam: '',
    eventDescription: '',
    eventLocation: '',
    eventFromTime: '',
    eventUntilTime: '',
    eventUsername: '' // Event code
  };
  $scope.event.eventDate;
  var eventToSend = {};

  // calls function from factory that saves event into the database
  $scope.createEvent = function(eventEntered) {
    console.log('EVENT ENTERED', eventEntered);

    console.log('event.eventName is',$scope.event.eventName);
    console.log('event.eventTeam is',$scope.event.eventTeam);
    console.log('event.eventDate is',$scope.event.eventDate);
    // validates and copies data to an object to send to the factory
    if ($scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
      console.log('inside if');
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
