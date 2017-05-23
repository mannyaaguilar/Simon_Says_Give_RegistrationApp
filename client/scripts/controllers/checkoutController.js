myApp.controller('CheckoutController', ['$scope', '$location', '$http', 'UtilitesService', function($scope, $location, $http, UtilitesService) {

$scope.formatTime = UtilitesService.formatTime;

//object for input volunteers to bind to
//NEED TO UPDATE, BRING IN VOLUNTEER OBJECT FROM FACTORY
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to store search results. Array of objects
$scope.volunteerList = [];

//Array to store selected volunteers (by ID) to checkout.
//CURRENTLY HARDCODED - NEED TO CHANGE TO EMPTY ARRAY
// $scope.checkoutList = [1, 2, 3, 4];
$scope.checkoutList = [];

// //CODE TO UPDATE - SKELETON FROM ANGULAR DOCUMENTATION
// $scope.items = [1,2,3,4,5];
$scope.items = [];
$scope.selected = [];
$scope.toggle = function (item, list) {
  var idx = list.indexOf(item);
  if (idx > -1) {
    list.splice(idx, 1);
  }
  else {
    list.push(item);
  }
  console.log('here is items: ', $scope.items);
  console.log('here is selected: ', $scope.selected);
};

$scope.exists = function (item, list) {
  return list.indexOf(item) > -1;
};

$scope.isIndeterminate = function() {
  return ($scope.selected.length !== 0 &&
      $scope.selected.length !== $scope.items.length);
};

$scope.isChecked = function() {
  return $scope.selected.length === $scope.items.length;
};

$scope.toggleAll = function() {
  if ($scope.selected.length === $scope.items.length) {
    $scope.selected = [];
  } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
    $scope.selected = $scope.items.slice(0);
  }
};
//DOCUMENTATION CODE END






//Connected to Search button - take inputs and check for records in database,
//appends results to DOM
$scope.search = function(volunteer) {
  $scope.getVolunteers(volunteer);
  $scope.success = true;
};

//http post to server - takes response and sets it equal to the volunteerList array
$scope.getVolunteers = function(volunteer) {
  console.log('volunteerObject in http: ', $scope.volunteerObject);
  console.log('logging volunteer in htpp function', volunteer);
  $http.post('/checkout', volunteer).then(function(response){
    $scope.volunteerList = response.data;
    console.log('logging checkout response: ', response);
    });
};

$scope.checkout = function(checkoutList) {
  console.log('logging checkoutList: ', $scope.checkoutList);
  $scope.checkoutVolunteers(checkoutList);
  $scope.changeView();
};

//PUT Route that updates the checkout time of chosen volunteer record(s)
$scope.checkoutVolunteers = function(volunteers) {
  console.log('logging volunteers in checkoutVolunteers: ', volunteers);
  var timeToFormat = new Date();
  var checkoutTime = $scope.formatTime(timeToFormat);

  $http.put('/checkout/' + volunteers + '/' + checkoutTime).then(function(response){
    console.log(response);
    });
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
