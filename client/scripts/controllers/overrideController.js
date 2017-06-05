myApp.controller('OverrideController', ['$window','$scope', '$http', '$location', 'UserService', function($window, $scope, $http, $location, UserService) {

  // function that uses $location to change to the required view
  $scope.redirect = UserService.redirect;
  // Event code currently stored in the factory
  var eventCode = UserService.eventObject.eventCode;
  // Code entered by the user
  $scope.adminCode = {
    thisCode: ''
  };
  // error message shown on screen
  $scope.message = '';

  //function to send user back to the appropriate waiver view
  $scope.waiverView = function() {
    $window.history.back();
  };

  //function to validate admin code and bring user to confirmation view
  $scope.finish = function(adminCode) {
    if (adminCode.thisCode == false) {
      $scope.message = 'Please enter admin code';
    }
    else if (adminCode.thisCode == eventCode) {
      $location.path('/confirmation');
    }
    else {
      $scope.message = 'Please try again';
    }
  };

}]);
