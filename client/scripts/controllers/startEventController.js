myApp.controller('startEventController', ['$scope', '$location', function($scope, $location) {
  // REMOVE DUMMY DATA LATER //
  // hard coded event
  // will need to compare code stored in a session somehow which needs to be figured out
  var eventCodeHardCoded = 1234;
  // code entered in input field by Admin
  $scope.code = {
    thisCode: ''
  };
  $scope.message = '';

  $scope.eventCode = function(code) {
    if(code.thisCode == false) {
      $scope.message = 'Please enter an event code';
    }
    else if (code.thisCode == eventCodeHardCoded){
      $location.path('checkInOut');
    }
    else {
        console.log(code.thisCode);
        $scope.message = 'Please try again.';
    }
  };
}]);
