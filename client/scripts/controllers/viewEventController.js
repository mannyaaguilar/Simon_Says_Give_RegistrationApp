myApp.controller('ViewEventController', ['$scope','$mdDialog','UserService','UtilitesService','EventService',
                function($scope,$mdDialog,UserService,UtilitesService,EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = {};
  $scope.serverResponseObject.currentEvent = EventService.serverResponseObject.currentEvent;
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

  // fills out input fields with current event information
  $scope.populate = function() {
    console.log('Current Event is:', EventService.serverResponseObject.currentEvent);
    if (EventService.serverResponseObject.currentEvent != undefined) {
      $scope.event.eventCode = EventService.serverResponseObject.currentEvent.event_code;
      $scope.event.eventName = EventService.serverResponseObject.currentEvent.event_name;
      $scope.event.eventDescription = EventService.serverResponseObject.currentEvent.event_description;
      $scope.event.eventLocation = EventService.serverResponseObject.currentEvent.event_location;
      $scope.event.eventFromTime = getTime(EventService.serverResponseObject.currentEvent.event_from_time);
      $scope.event.eventUntilTime = getTime(EventService.serverResponseObject.currentEvent.event_until_time);
      $scope.event.eventDate = getDate(EventService.serverResponseObject.currentEvent.event_date);
      $scope.event.eventTeam = EventService.serverResponseObject.currentEvent.event_team;
    }
  }

  // calling the function that fills out the edit form
  $scope.populate();

  // formats time to be displayed in input type="time"
  function getTime(timeString) {
    var hours = timeString.substr(0,2);
    var minutes = timeString.substr(3,2);
    var formattedTime = new Date(1900, 0, 1, hours, minutes, 0);
    return formattedTime
  }

  // formats date to be displayed in date picker
  function getDate(dateString) {
    var year = dateString.substr(0,4);
    var month = dateString.substr(5,2) - 1; // months are 0 based
    var day = dateString.substr(8,2);
    var formattedTime = new Date(year, month, day, 0, 0, 0);
    return formattedTime
  }

  // calls function from factory that saves changes to event into the database
  $scope.editEvent = function(eventEntered) {
    console.log('EDITING EVENT', eventEntered);
    // validates and copies data to an object to send to the factory
    if ($scope.event.eventCode != '' && $scope.event.eventName != '' && $scope.event.eventTeam != '' && $scope.event.eventDate) {
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
      EventService.updateEvent(eventToSend);
    }
  } // function updateEvent()

  // Checks out all remaining active volunteers
  $scope.logoutVolunteers = function(eventObject) {
    var eventParams = {};
    eventParams.eventCode = eventObject.eventCode;
    eventParams.time = UtilitesService.formatTime(eventObject.eventUntilTime);
    console.log('Logging out volunteers for event:', eventParams);
    EventService.logoutVolunteersByEvent(eventParams);
  }

}]);
