myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

$scope.adultWaiver = {};
$scope.submitAdultWaiver = function(waiverObj) {
  console.log("Adult waiver object: ", waiverObj);
};

}]);

//SERVICE
