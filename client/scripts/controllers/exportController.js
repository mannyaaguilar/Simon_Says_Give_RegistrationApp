myApp.controller('ExportController', ['$scope', '$http', '$location', 'UserService', 'UtilitiesService','CSVService',
            function($scope, $http, $location, UserService, UtilitiesService, CSVService) {

  // function that uses $location to change to the required view
  $scope.redirect = UserService.redirect;
  // option selected by user
  $scope.exportOption = '';
  // boolean value that enables/disables dates for option Volunteer hours
  $scope.datesEnabledValue = true;
  // boolean value that enables/disables dates for option Office hours
  $scope.officeDatesEnabledValue = true;
  // Dates for option Volunteer hours
  $scope.fromDate;
  $scope.toDate;
  // Dates for option Office hours
  $scope.officeFromDate;
  $scope.officeToDate;
  // error message string (for date validation)
  var errorMessage = "";

  // prepares information (parameter dates) and calls function in factory
  $scope.exportInformation = function(option) {
    data = {
      fromDate : new Date(),
      toDate : new Date()
    };
    // checks if option selected was hours and prepares data object of parameters
    if ($scope.exportOption === 'hours') {
      data.fromDate = $scope.fromDate;
      data.toDate = $scope.toDate;
      if (validDates (data.fromDate, data.toDate)) {
        // calls function in factory that requests data from the server
        CSVService.requestHoursCSV(data);
      }
    } else if ($scope.exportOption === 'officeHours') {
      data.fromDate = $scope.officeFromDate;
      data.toDate = $scope.officeToDate;
      if (validDates (data.fromDate, data.toDate)) {
        // calls function in factory that requests data from the server
        CSVService.requestOfficeHoursCSV(data);
      }
    } else {
      // calls function in factory that requests data from the server
      CSVService.requestVolunteerCSV();
    }
  };

  // validates the date selection
  function validDates(fromDate, toDate) {
    if (fromDate && toDate) {
      if(toDate < fromDate) {
        errorMessage = 'Invalid date Selection';
        UtilitiesService.showAlert(errorMessage);
        return false;
      } else {
        return true;
      }
    } else {
      errorMessage = 'Invalid date Selection';
      UtilitiesService.showAlert(errorMessage);
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

    if ($scope.exportOption === 'officeHours'){
      if ($scope.officeDatesEnabledValue) {
        $scope.officeDatesEnabledValue = false;
      }
    } else {
      $scope.officeDatesEnabledValue = true;
    }
  };

}]);
