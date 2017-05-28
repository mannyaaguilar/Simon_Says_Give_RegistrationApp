myApp.controller('ConfirmationController', ['$scope', '$http', '$location', 'UserService', '$timeout',
                function($scope, $http, $location, UserService, $timeout) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;

  //timer variable for page timeout
  var timer;

  //On page timeout, view changes to /checkInOut. Timeout measured in milliseconds
  $scope.timeOut = function(){
    timer = $timeout(function () {
      $scope.changeView();
    }, 7000);
  };

  //timeOut function call on page load
  $scope.timeOut();

  //changes view to checkInOut page, cancels timeout
  $scope.changeView = function() {
    $location.path('/checkInOut');
    $timeout.cancel(timer);
  };

}]);
