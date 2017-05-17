myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'CSVService', function($scope, $http, $location, UserService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;

  console.log('ExportController loaded');

  $scope.exportInformation = function(option) {
    console.log('Export Information clicked, exporting: ', option);
    CSVService.requestCSV(option);
  };

}]);
