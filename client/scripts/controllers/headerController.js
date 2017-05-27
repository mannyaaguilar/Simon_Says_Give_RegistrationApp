myApp.controller('HeaderController', ['$scope', 'UserService', function($scope, UserService) {

  $scope.redirect = UserService.redirect;
  $scope.logout = UserService.logout;
  $scope.eventObject = UserService.eventObject;

}]);
