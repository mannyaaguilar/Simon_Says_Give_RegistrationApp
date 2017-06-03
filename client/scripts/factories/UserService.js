myApp.factory('UserService', ['$http', '$location', function($http, $location){

  var userObject = {};
  var eventObject = {};

  // Redirects to the view received as a parameter
  function redirect(page){
    $location.url(page);
  }

  // validates that the user has a current session and is allowed to see
  // current view
  function getuser(adminRequired){
    $http.get('/user').then(function(response) {
        if (adminRequired) {
          if(response.data.username && (response.data.role === adminRequired)) {
            // user has a curret session on the server
            userObject.id = response.data.id;
            userObject.userName = response.data.username;
          } else {
            // user has no session or current view access is not permitted,
            // bounce them back to the login page
            $location.path('/login');
          }
        } else {
          if(response.data.username) {
            // user has a curret session on the server
            userObject.id = response.data.id;
            userObject.userName = response.data.username;
          } else {
            // user has no session, bounce them back to the login page
            $location.path('/login');
          }
        }
    });
  };

  // Checks that event code has been entered otherwise goes back to login view
  function checkEvent() {
    if(!eventObject.eventCode) {
      redirect('/login');
    }
  };

  // Logs out user
  function logout() {
      $http.get('/user/logout').then(function(response) {
        redirect('/login');
      });
  };

  return {
    userObject : userObject,
    eventObject : eventObject,
    redirect : redirect,
    getuser : getuser,
    checkEvent : checkEvent,
    logout : logout
  };

}]);
