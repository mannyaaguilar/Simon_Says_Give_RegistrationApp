myApp.controller('LoginController', ['$scope', '$http', '$routeParams', 'UserService', 'UtilitiesService',
        function($scope, $http, $routeParams, UserService, UtilitiesService) {

  $scope.user = {
    username: '',
    password: ''
  };
  $scope.event = {
    eventCode: ''
  };


  // Logins Admin user
  $scope.login = function() {
    if($scope.user.username == '' || $scope.user.password == '') {
      UtilitiesService.showAlert('Enter your username and password!');
    } else {
      $http.post('/', $scope.user).then(function(response) {
        if(response.data.username) {
          if (response.data.role === 'ADMIN') {
            UserService.redirect('/displayEvents');
          } else {
            UserService.redirect('/checkInOut');
          }
        } else {
          UtilitiesService.showAlert('Invalid username and password combination.');
        }
      });
    }
  };

  // Starts event based on event code
  $scope.startEvent = function() {
    if($scope.event.eventCode == '') {
      UtilitiesService.showAlert('Please enter an event code!');
    } else {
      $http.get('/ssgEvent/start/' + $scope.event.eventCode).then(function(response) {
        if(response.data.event_code) {
          UserService.eventObject.eventCode = response.data.event_code;
          UserService.eventObject.eventName = response.data.event_name;
          UserService.redirect('/checkInOut');
        } else {
          UtilitiesService.showAlert('Invalid event code.');
        }
      });
    }
  };

  // sends request to get a link to reset the password
  $scope.sendResetPassword = function() {
  if($scope.user.username === '') {
    UtilitiesService.showAlert('Please enter your username.');
  } else {
    $http.post('/user/forgotpassword', $scope.user).then(function(response) {
      if(response.data == 'Code sent successfully.') {
        UtilitiesService.showAlert('A link to change the password was sent by email.');
      } else {
        UtilitiesService.showAlert('There was an error sending the link to change the password.');
      }
    });
  }
};

// sends request to the server with updated password
$scope.updatePassword = function() {
  // Send our password reset request to the server
  // with our username, new password and code
  if($scope.user.username === '' || $scope.user.password === '') {
    UtilitiesService.showAlert('Please enter your username and password.');
  } else {
    $scope.user.code = $routeParams.code;
    $http.put('/user/resetpassword', $scope.user).then(function(response) {
      if(response.data == 'Password updated successfully.') {
        UtilitiesService.showAlert('Password updated successfully.');
        UserService.redirect('/home');
      } else {
        UtilitiesService.showAlert('There was an error updating the password');
      }
    });
  }
};


}]);
