myApp.factory('EventService', ['$http', function($http){
  console.log('CSVService Loaded');

  serverResponseObject = {};

  // Gets all recipes in the database for a specific uset
  getEvents = function(){
    console.log('in getEvents');
    $http.get('/ssgEvent/').then(function(response) {
      console.log('Back from the server with:', response);
      serverResponseObject.allEvents = response.data;
      console.log('Updated serverResponseObject:', serverResponseObject.allEvents);
    });
  };


  // Sends event information to server
  postEvent = function(eventToPost) {
    console.log('Posting event ', eventToPost);
    $http.post('/ssgEvent/add', eventToPost).then(function(response) {
      console.log('Back from server after posting event', response);
      serverResponseObject.response = response;
    });
  };

  return {
    serverResponseObject : serverResponseObject,
    getEvents : getEvents,
    postEvent : postEvent

  };
}]);
