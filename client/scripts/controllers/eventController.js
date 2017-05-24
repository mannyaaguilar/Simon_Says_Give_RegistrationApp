myApp.controller('EventController', ['$scope','$mdDialog','UserService','UtilitesService','EventService',
                function($scope,$mdDialog,UserService,UtilitesService,EventService) {

  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = EventService.serverResponseObject;

  EventService.getEvents();

  // Modal window that confirms event deletion
  $scope.showConfirm = function(ev,ssgEvent) {
    var confirm = $mdDialog.confirm()
          .title('Are you sure that you want to delete this event?')
          .textContent('')
          .ariaLabel('Delete event')
          .targetEvent(ev)
          .ok('Delete')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      console.log('DELETING: ',ssgEvent);
      EventService.deleteEvent(ssgEvent);
      }, function() {
      console.log('Deletion cancelled');
    });
  };

  // Redirects to Event View
  $scope.viewEvent = function(ssgEvent) {
    console.log('view event clicked',ssgEvent);
    EventService.serverResponseObject.currentEvent = ssgEvent;
    UserService.redirect('/viewEvent');
  };

  // calls factory function to check out all active volunteers for the event
  $scope.logoutVolunteers = function(eventObject) {
    console.log("Event object ISSSS", eventObject);
    var eventParams = {};
    eventParams.eventCode = eventObject.event_code;
    eventParams.time = eventObject.event_until_time;
    console.log('Logging out volunteers for event:', eventParams);
    EventService.logoutVolunteersByEvent(eventParams);
  }

}]);
