myApp.controller('startEventController', ['$scope', '$location', function($scope, $location) {
  // REMOVE DUMMY DATA LATER //
  // hard coded event
  // will need to compare code stored in a session somehow which needs to be figured out
  var eventCodeHardCoded = 4783;
  // code entered in input field by Admin
  $scope.code = {
    thisCode: ''
  };
  $scope.eventCode = function(code){
    console.log("Event Code button clicked", code.thisCode);
    if (code.thisCode == eventCodeHardCoded) {
      $location.path('/checkInOut');
    }
    else {
      console.log('try again');
  }
};
}]);
