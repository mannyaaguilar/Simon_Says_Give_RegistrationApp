myApp.controller('OverrideController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('OverrideController loaded');
$scope.redirect = UserService.redirect;

var adminCodeHardCoded = 1234;
$scope.adminCode = {
  thisCode: ''
};
$scope.message = '';
//function to send user back to the appropriate waiver view
$scope.waiverView = function() {
  console.log('need to add appropriate $location logic');
  // $location.path('/somewhereAwesome');
};

//function to validate admin code and bring user to confirmation view
$scope.finish = function(adminCode) {
  //NEED TO ADD CODE VALIDATION!!! If/else logic?
  if (adminCode.thisCode == false) {
    $scope.message = 'Please enter admin code';
  }
  else if (adminCode.thisCode == adminCodeHardCoded) {
    $location.path('/confirmation');
  }
  else {
    $scope.message = 'Please try again.';
  }
};
}]);
