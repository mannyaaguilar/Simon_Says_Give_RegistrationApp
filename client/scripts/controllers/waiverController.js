myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

$scope.adultWaiver = {};
$scope.submitAdultWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

$scope.youthWaiver = {};
$scope.submitYouthWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

$scope.photoWaiver = {};
$scope.submitPhotoWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

}]);

//SERVICE
