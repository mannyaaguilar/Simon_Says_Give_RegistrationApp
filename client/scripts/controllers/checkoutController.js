myApp.controller('CheckoutController', ['$scope', '$location', function($scope, $location) {

$scope.volunteerObject = {
    firstName: '',
    lastName: '',
    email: '',
};

$scope.search = function() {
  console.log('volunteerObject: ', $scope.volunteerObject);
};

$scope.checkout = function() {
  // put to database - update chosen volunteer(s) checkout time in database
  $scope.changeView();
  //NEED TO ADD: PUT ROUTE to add checkout time to volunteer hours record
  console.log('Logging checkout time on click: ', new Date());
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
