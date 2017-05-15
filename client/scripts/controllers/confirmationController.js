myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', function($scope, $http, $location, $interval, UserService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  $scope.enabled = true;
  $scope.timer = 0;
  var timeOutLength = 3;

  // function that changes view to check-in/check-out after x amount of seconds
  $scope.timeOut = function() {
    var interval = $interval(function(){
      if ($scope.timer < timeOutLength){
        $scope.timer += 1;
        }
      else {
        $scope.changeView();
        $interval.cancel(interval);
      }
    }, 1000);
  }; //end timeout

  //changes view to checkInOut page
  $scope.changeView = function() {
    // $location.path('/checkInOut');
    $location.path('/user');
  };

  // timeOut function runs on view load - redirects page in 10 seconds
  $scope.timeOut();

}]);
