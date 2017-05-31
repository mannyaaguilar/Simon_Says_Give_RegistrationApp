myApp.controller('CheckoutController', ['$scope', '$location', '$http',
                'UtilitiesService', 'UserService',
                function($scope, $location, $http, UtilitiesService, UserService) {

$scope.formatTime = UtilitiesService.formatTime;
$scope.eventObject = UserService.eventObject;
//object for input volunteers to bind to
//NEED TO UPDATE, BRING IN VOLUNTEER OBJECT FROM FACTORY
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to store search results. Array of objects
$scope.volunteerList = [];

//Array to store checkoutList volunteers by ID to checkout.
$scope.checkoutList = [];


$scope.items = [];

$scope.toggle = function (item, list) {
  var idx = list.indexOf(item);
  if (idx > -1) {
    list.splice(idx, 1);
  }
  else {
    list.push(item);
  }
  console.log('here is items: ', $scope.items);
  console.log('here is checkoutList: ', $scope.checkoutList);
};

$scope.exists = function (item, list) {
  return list.indexOf(item) > -1;
};

$scope.isIndeterminate = function() {
  return ($scope.checkoutList.length !== 0 &&
      $scope.checkoutList.length !== $scope.items.length);
};

$scope.isChecked = function() {
  return $scope.checkoutList.length === $scope.items.length;
};

$scope.toggleAll = function() {
  if ($scope.checkoutList.length === $scope.items.length) {
    $scope.checkoutList = [];
  } else if ($scope.checkoutList.length === 0 || $scope.checkoutList.length > 0) {
    $scope.checkoutList = $scope.items.slice(0);
  }
};

//Connected to Search button - take inputs and check for records in database,
//appends results to DOM
$scope.search = function(volunteer) {
  $scope.getVolunteers(volunteer);
  $scope.success = true;
};

//http post to server - takes response and sets it equal to the volunteerList array
$scope.getVolunteers = function(volunteer) {
  console.log('volunteerObject in http: ', $scope.volunteerObject);
  volunteer.eventID = $scope.eventObject.eventCode;
  console.log('logging volunteer in http function', volunteer);
  console.log('logging event objectL: ', $scope.eventObject);
  $http.post('/checkout/', volunteer).then(function(response){
    $scope.volunteerList = response.data;
    console.log('logging checkout response: ', response);
    });
};

var filledOut;

filledOut = $scope.volunteerObject.email ||
            $scope.volunteerObject.first_name ||
            $scope.volunteerObject.last_name;

$scope.checkout = function(checkoutList) {
  console.log('logging checkoutList: ', $scope.checkoutList);
  $scope.checkoutVolunteers(checkoutList);
  if (filledOut) {
  $scope.changeView();
  }
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
  $location.path('/confirmed');
};

}]);
