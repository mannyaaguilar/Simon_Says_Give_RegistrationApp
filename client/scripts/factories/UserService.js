myApp.factory('UserService', ['$http', '$location', function($http, $location){
  console.log('User Service Loaded');

  var userObject = {};

  function redirect(page){
    console.log('in page navigation', page);
    $location.url(page);
  }

  function volunteerCheckIn(volunteer){
    console.log("volunteerCheckIn function accessed", volunteer);
    if(volunteer.under_18 === true){
      console.log("General Waiver Needed- youth", volunteer.dob);
      $location.path('/waiver-youth');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
      console.log("Adult General Waiver & Photo Waiver on record");
      $location.path('/confirmation');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
      console.log("General Waiver on record, just need Photo Waiver");
      $location.path('/waiver-photo');
    } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
      console.log("Photo Waiver on record, just need General Waiver");
      $location.path('/waiver-adult');
    } else {
      $location.path('/waiver-adult');
    }
  }


  return {
    userObject : userObject,
    redirect : redirect,
    volunteerCheckIn: volunteerCheckIn,

    getuser : function(){
      $http.get('/user').then(function(response) {
        // console.log('logging response.data in get user: ', response.data);
          if(response.data.username) {
              // user has a curret session on the server
              userObject.id = response.data.id;
              userObject.userName = response.data.username;
              console.log('User userName, id: ', userObject.userName, userObject.id);
          } else {
              // user has no session, bounce them back to the login page
              $location.path('/login');
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
