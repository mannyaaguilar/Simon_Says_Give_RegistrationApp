myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', '$timeout', function($scope, $http, $location, $interval, UserService, $timeout) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  var timer;

  //On page timeout, view changes to /checkInOut. Timeout measured in milliseconds
  $scope.timeOut = function(){
    timer = $timeout(function () {
      $scope.changeView();
    }, 7000);
  };

  //timeOut function call on page load
  $scope.timeOut();

  //changes view to checkInOut page, cancels timout
  $scope.changeView = function() {
    $location.path('/checkInOut');
    $timeout.cancel(timer);
  };

}]);
