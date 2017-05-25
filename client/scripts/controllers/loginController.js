myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.event = {
    eventCode: ''
  };
  $scope.adminMessage = '';
  $scope.eventMessage = '';
  $scope.message = '';


  // Logins Admin user
  $scope.login = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      $scope.adminMessage = "Enter your username and password!";
    } else {
      console.log('sending to server...', $scope.user);
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          console.log('success: ', response.data);
          // location works with SPA (ng-route)
          console.log('redirecting to admin page');
          if (response.data.role === 'ADMIN') {
            $location.path('/displayEvents');
          } else {
            $location.path('/checkInOut');
          }
        } else {
          console.log('failure: ', response);
          $scope.adminMessage = "Invalid username and password combination.";
        }
      });
    }
  };

  // Starts event based on event code
  $scope.startEvent = function() {
    console.log('startEvent clicked:', $scope.event.eventCode);
    if($scope.event.eventCode == '') {
      $scope.eventMessage = "Enter an event code!";
    } else {
      console.log('sending to server...', $scope.event);
      $http.get('/ssgEvent/start/' + $scope.event.eventCode).then(function(response) {
        console.log(response);
        if(response.data.event_code) {
          console.log('success: ', response.data);
          UserService.eventObject.eventCode = response.data.event_code;
          UserService.eventObject.eventName = response.data.event_name;
          console.log('EVENT CODE', UserService.eventObject.eventCode);
          console.log('EVENT NAME', UserService.eventObject.eventName);
          $location.path('/checkInOut');
        } else {
          console.log('failure: ', response);
          $scope.eventMessage = "Invalid event code.";
        }
      });
    }
  };

  // sends request to get a link to reset the password
  $scope.sendResetPassword = function() {
  if($scope.user.username === '') {
    $scope.message = "Enter your username!";
  } else {
    console.log('sending to server...', $scope.user);
    $http.post('/user/forgotpassword', $scope.user).then(function(response) {
      if(response.data.username) {
        console.log('success: ', response.data);
        // location works with SPA (ng-route)
        $scope.message = "Password link sent.";
      } else {
        console.log('failure: ', response);
        $scope.message = "Failure.";
      }
    });
  }
};

}]);
