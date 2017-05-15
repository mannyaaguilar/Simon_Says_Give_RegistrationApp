myApp.controller('OverrideController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log('OverrideController loaded');

$scope.redirect = UserService.redirect;

//function to send user back to the appropriate waiver view
$scope.waiverView = function() {
  console.log('need to add appropriate $location logic');
  // $location.path('/somewhereAwesome');
};

//function to validate admin code and bring user to confirmation view
$scope.finish = function() {
  //NEED TO ADD CODE VALIDATION!!! If/else logic?
  console.log('sending to confirmation without code for now');
  $location.path('/confirmation');
};

}]);
