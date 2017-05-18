myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'CSVService', function($scope, $http, $location, UserService, CSVService) {

  $scope.userObject = UserService.userObject;
  $scope.logout = UserService.logout;
  $scope.redirect = UserService.redirect;
  $scope.serverResponseObject = CSVService.serverResponseObject;
  $scope.exportOption = '';
  $scope.datesEnabledValue = true;
  $scope.errorMessage = "";
  $scope.fromDate;
  $scope.toDate;

  console.log('ExportController loaded');

  // prepares information (parameter dates) and calls function in factory
  $scope.exportInformation = function(option) {
    console.log('Export Information clicked, exporting: ', option);

    data = {
      fromDate : new Date(),
      toDate : new Date()
    };
    // checks if option selected was hours and prepares data object of parameters
    if ($scope.exportOption === 'hours'){
      console.log('From Date', $scope.fromDate);
      console.log('To Date', $scope.toDate);
      data.fromDate = $scope.fromDate;
      data.toDate = $scope.toDate;
      if (validDates (data.fromDate, data.toDate)) {
        // calls function in factory that requests data from the server
        CSVService.requestHoursCSV(data);
      }
    } else {
      CSVService.requestVolunteerCSV();
    }
  };

  function validDates(fromDate, toDate) {
    if (fromDate && toDate) {
      if(toDate < fromDate) {
        $scope.errorMessage = 'Invalid date Selection';
        return false;
      } else {
        return true;
      }
    } else {
      $scope.errorMessage = 'Invalid date Selection';
      return false;
    }
  };

  // enables/disables datepickers depending on option selected
  $scope.toggleEnableDates = function() {
    if ($scope.exportOption === 'hours'){
      if ($scope.datesEnabledValue) {
        $scope.datesEnabledValue = false;
      }
    } else {
      $scope.datesEnabledValue = true;
    }
  }

}]);
