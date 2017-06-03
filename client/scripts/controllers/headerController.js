myApp.controller('HeaderController', ['$scope', 'UserService', function($scope, UserService) {

  // function that uses $location to change to the required view
  $scope.redirect = UserService.redirect;
  // function that logs out the user
  $scope.logout = UserService.logout;
  // object that stores event information in the factory
  $scope.eventObject = UserService.eventObject;

}]);
