myApp.controller('CheckoutController', ['$scope', '$location', function($scope, $location) {

$scope.volunteerObject = {
    firstName: '',
    lastName: '',
    email: '',
};

$scope.success = false;

$scope.search = function() {
  console.log('volunteerObject: ', $scope.volunteerObject);
  //NEED TO ADD: GET to collect matching records by email and/or name
  $scope.success = true;
};

$scope.checkout = function() {
  //NEED TO ADD: PUT ROUTE to add checkout time to chosen volunteer hours record
  console.log('Logging checkout time on click: ', new Date());

  //changes view to confirmation page:
  $scope.changeView();
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
