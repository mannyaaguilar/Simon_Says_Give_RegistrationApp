myApp.controller('AddAdminController', ['$scope', '$http', '$location', 'UserService', 'UtilitiesService',
                function($scope, $http, $location, UserService, UtilitiesService) {

  $scope.redirect = UserService.redirect;
  var message = '';
  $scope.adminUser = {
    username: '',
    password: '',
    email: '',
    role: 'ADMIN'
  };

  // Registers a new ADMIN user
  $scope.registerAdminUser = function() {
    if($scope.adminUser.username == '' || $scope.adminUser.password == '' || $scope.adminUser.email == '') {
      UtilitiesService.showAlert('Please enter all the required information.');
    } else {
      console.log('sending to server...', $scope.adminUser);
      $http.post('/register', $scope.adminUser).then(function(response) {
        console.log('success');
        message = $scope.adminUser.username + ' has been added as an Admin User.';
        showAlert(message);
      },
      function(response) {
        console.log('error');
        message = "Error adding admin. Please make sure admin doesn’t already exist."
        showAlert(message);
      });
    }
  }
}]);
