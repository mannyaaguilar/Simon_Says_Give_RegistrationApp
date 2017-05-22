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
    // validates and copies data to an object to send to the factory
    if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
      console.log('inside if');
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
  } // function createEvent()


}]);
