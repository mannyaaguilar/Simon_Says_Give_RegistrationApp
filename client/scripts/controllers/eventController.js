myApp.controller('EventController', ['$scope','$mdDialog','UserService','UtilitiesService','EventService',
                function($scope,$mdDialog,UserService,UtilitiesService,EventService) {

  // function that uses $location to change to the required view
  $scope.redirect = UserService.redirect;
  // object in the EventService factory that stores event information
  $scope.serverResponseObject = EventService.serverResponseObject;

  // gets all Simon Says Give events to get them displayed on the view
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
      EventService.deleteEvent(ssgEvent);
      }, function() {
    });
  };

  // Redirects to Event View
  $scope.viewEvent = function(ssgEvent) {
    EventService.serverResponseObject.currentEvent = ssgEvent;
    UserService.redirect('/viewEvent');
  };

  // calls factory function to check out all active volunteers for the event
  $scope.logoutVolunteers = function(eventObject) {
    var eventParams = {};
    eventParams.eventCode = eventObject.event_code;
    eventParams.time = eventObject.event_until_time;
    EventService.logoutVolunteersByEvent(eventParams);
  }

}]);
