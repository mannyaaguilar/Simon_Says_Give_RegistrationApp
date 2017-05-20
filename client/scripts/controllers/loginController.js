myApp.controller('LoginController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
    $scope.user = {
      username: '',
      password: ''
    };
    $scope.message = '';

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
