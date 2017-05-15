myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', function($scope, $http, $location, $interval, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  // function that changes view to check-in/check-out after 15 seconds
  $scope.enabled = true;
  $scope.timer = 0;

  $scope.timeOut = function() {
    var interval = $interval(function(){
      if ($scope.timer < 10){
        $scope.timer += 1;
        console.log('+ 1 second!');
        }
      else {
      // $location.path('/checkInOut');
      $location.path('/user');
      $interval.cancel(interval);
      }
    }, 1000);
  }; //end timeout

  // timeOut function runs on view load
  $scope.timeOut();
}]);
