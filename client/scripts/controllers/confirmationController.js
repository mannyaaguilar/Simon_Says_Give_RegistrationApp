myApp.controller('ConfirmationController', ['$scope', '$http', '$location', '$interval', 'UserService', '$timeout', function($scope, $http, $location, $interval, UserService, timeout) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  $scope.$timeout( function(){
    $location.path('/checkInOut');
  }, 5000 );


  //changes view to checkInOut page
  $scope.changeView = function() {
    $location.path('/checkInOut');
  };

  // timeOut function runs when confirmation view is loaded
  // $scope.timeOut();

}]);
