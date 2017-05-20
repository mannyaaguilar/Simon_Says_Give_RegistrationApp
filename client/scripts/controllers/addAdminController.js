myApp.controller('addAdminController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {

  $scope.redirect = UserService.redirect;
  $scope.message = '';
  $scope.adminUser = {
    username: '',
    password: '',
    role: 'ADMIN'
  };

  // Registers a new ADMIN user
  $scope.registerAdminUser = function() {
    if($scope.adminUser.username == '' || $scope.adminUser.password == '') {
      $scope.message = "Choose a username and password.";
    } else {
      console.log('sending to server...', $scope.adminUser);
      $http.post('/register', $scope.adminUser).then(function(response) {
        console.log('success');
        $scope.message = 'User ' + $scope.adminUser.username + ' has been added as an Admin User.'
      },
      function(response) {
        console.log('error');
        $scope.message = "Please try again."
      });
    }
  }
}]);
