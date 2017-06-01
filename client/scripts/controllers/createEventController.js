myApp.controller('CreateEventController', ['$scope', '$location','UserService', 'UtilitiesService','EventService',
                function($scope, $location, UserService, UtilitiesService, EventService) {

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
        eventToSend.eventDate = UtilitiesService.formatDate(eventToSend.eventDate);

        if (eventToSend.eventFromTime) {
          eventToSend.eventFromTime = UtilitiesService.formatTime(eventToSend.eventFromTime);
        }
        if (eventToSend.eventUntilTime) {
          eventToSend.eventUntilTime = UtilitiesService.formatTime(eventToSend.eventUntilTime);
        }
        // send information to factory
        console.log('EVENT TO SEND: ', eventToSend);
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
