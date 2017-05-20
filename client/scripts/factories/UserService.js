myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};

  function redirect(page){
    console.log('in page navigation', page);
    $location.url(page);
  }

  return {
    userObject : userObject,
    redirect : redirect,

    getuser : function(adminRequired){
      $http.get('/user').then(function(response) {
        console.log('logging response.data in get user: ', response.data);
          // validates that the user has a current session and is allowed to see
          // current view
          if (adminRequired) {
            if(response.data.username && (response.data.role === adminRequired)) {
                // user has a curret session on the server
                userObject.id = response.data.id;
                userObject.userName = response.data.username;
                console.log('User userName, id: ', userObject.userName, userObject.id);
            } else {
                // user has no session or current view access is not permitted, bounce them back to the login page
                $location.path('/login');
            }
          } else {
            if(response.data.username) {
                // user has a curret session on the server
                userObject.id = response.data.id;
                userObject.userName = response.data.username;
                console.log('User userName, id: ', userObject.userName, userObject.id);
            } else {
                // user has no session, bounce them back to the login page
                $location.path('/login');
            }
          }
      });
    },

    logout : function() {
        $http.get('/user/logout').then(function(response) {
          console.log('logged out');
          $location.path('/login');
        });
    }
  };
}]);
