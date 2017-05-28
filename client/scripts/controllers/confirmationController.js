myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', '$timeout', function($scope, $http, $location, $interval, UserService, $timeout) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  //On page timeout, view changes to /checkInOut. Timeout measured in milliseconds
  $scope.timeOut = $timeout( function(){
    $location.path('/checkInOut');
  }, 7000 );

}]);
