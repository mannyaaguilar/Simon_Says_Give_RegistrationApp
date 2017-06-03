myApp.factory('EventService', ['$http','$mdDialog', function($http,$mdDialog){
  console.log('CSVService Loaded');

  // stores event information
  serverResponseObject = {};

  // Gets all events in the database
  getEvents = function(){
    console.log('in getEvents');
    $http.get('/ssgEvent/').then(function(response) {
      console.log('Back from the server with:', response);
      serverResponseObject.allEvents = response.data;
    });
  };

  // Sends event information to server
  postEvent = function(eventToPost) {
    console.log('Posting event ', eventToPost);
    $http.post('/ssgEvent/add', eventToPost).then(function(response) {
      console.log('Back from server after posting event', response);
      showAlert(response.data);
    });
  };

  // Deletes a specific event
  deleteEvent = function(ssgEvent) {
    console.log('Deleting event: ', ssgEvent);
    $http.delete('/ssgEvent/delete/' + ssgEvent.event_code).then(function(response) {
      getEvents();
    });
  };

  // Updates a specific event
  updateEvent = function(eventToUpdate) {
    console.log('Updating event: ', eventToUpdate);
    $http.put('/ssgEvent/update', eventToUpdate).then(function(response) {
      showAlert(response.data);
      getEvents();
    });
  };

  // Logs out all volunteers for a specific event
  logoutVolunteersByEvent = function(eventParams) {
    console.log('Logging out volunteers - event: ', eventParams);
    $http.put('/ssgEvent/logoutAll', eventParams).then(function(response) {
      console.log("response is", response.data.rowCount);
      showAlert(response.data.rowCount + ' active volunteers have been checked out.');
    });
  };

  // Alert dialog to inform response to the user
  showAlert = function(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title(message)
          .ariaLabel(message)
          .ok('Ok')
      );
    };

  return {
    serverResponseObject : serverResponseObject,
    getEvents : getEvents,
    postEvent : postEvent,
    deleteEvent : deleteEvent,
    updateEvent : updateEvent,
    logoutVolunteersByEvent : logoutVolunteersByEvent
  };
}]);
