myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';
    $scope.event = {
      eventCode: ''
    };


    $scope.login = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Enter your username and password!";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/', $scope.user).then(function(response) {
          if(response.data.username) {
            console.log('success: ', response.data);
            // location works with SPA (ng-route)
            console.log('redirecting to admin page');
            if (response.data.role === 'ADMIN') {
              $location.path('/admin');
            } else {
              $location.path('/checkInOut');
            }
          } else {
            console.log('failure: ', response);
            $scope.message = "Invalid username and password combination.";
          }
        });
      }
    };

    $scope.startEvent = function() {
      console.log('startEvent clicked:', $scope.event.eventCode);
      if($scope.event.eventCode == '') {
        $scope.message = "Enter an event code!";
      } else {
        console.log('sending to server...', $scope.event);
        $http.get('/newEvent/start/' + $scope.event.eventCode).then(function(response) {
          console.log(response);
          if(response.data.event_code) {
            console.log('success: ', response.data);
            UserService.eventObject.eventCode = response.data.event_code;
            UserService.eventObject.eventName = response.data.event_name;
            console.log('EVENT CODE', UserService.eventObject.eventCode);
            console.log('EVENT NAME', UserService.eventObject.eventName);
            // console.log('EVENT CODE', response.data.event_code);
            // console.log('EVENT NAME', response.data.event_name);
            $location.path('/checkInOut');
          } else {
            console.log('failure: ', response);
            $scope.message = "Invalid event code.";
          }
        });
      }





    }

    $scope.registerUser = function() {
      if($scope.user.username == '' || $scope.user.password == '') {
        $scope.message = "Choose a username and password.";
      } else {
        console.log('sending to server...', $scope.user);
        $http.post('/register', $scope.user).then(function(response) {
          console.log('success');
          $location.path('/home');
        },
        function(response) {
          console.log('error');
          $scope.message = "Please try again."
        });
      }
    }
}]);
