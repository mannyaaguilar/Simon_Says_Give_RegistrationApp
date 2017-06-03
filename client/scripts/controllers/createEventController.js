myApp.controller('CreateEventController', ['$scope', '$location','UserService', 'UtilitiesService','EventService',
                function($scope, $location, UserService, UtilitiesService, EventService) {

  // function that uses $location to change to the required view
  $scope.redirect = UserService.redirect;
  // object in the EventService factory that stores event information
  $scope.serverResponseObject = EventService.serverResponseObject;
  // object that stores information entered by the user
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
  // object with event information formatted to be sent to the server
  var eventToSend = {};

  // calls function from factory that saves event into the database
  $scope.createEvent = function(eventEntered) {
    // validates and copies data to an object to send to the factory
    if (alphanumeric($scope.event.eventCode)) {
      if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
        eventToSend = angular.copy($scope.event);
        eventToSend.eventDate = UtilitiesService.formatDate(eventToSend.eventDate);

        if (eventToSend.eventFromTime) {
          eventToSend.eventFromTime = UtilitiesService.formatTime(eventToSend.eventFromTime);
        }
        if (eventToSend.eventUntilTime) {
          eventToSend.eventUntilTime = UtilitiesService.formatTime(eventToSend.eventUntilTime);
        }
        // send information to factory
        EventService.postEvent(eventToSend);
      }
    } else {
      UtilitiesService.showAlert('Please enter an alphanumeric code');
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
