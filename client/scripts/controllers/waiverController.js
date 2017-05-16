myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  $scope.adultWaiver = {};
  $scope.submitAdultWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    $location.path("/waiver-photo");
  };

  $scope.youthWaiver = {};
  $scope.submitYouthWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    if ( waiverObj.noParent ) {
      $location.path("/override");
    }
    else {
      $location.path("/waiver-photo");
    }
  };

  $scope.photoWaiver = {};
  $scope.submitPhotoWaiver = function(waiverObj) {
    console.log("Adult waiver object: ", waiverObj);
    if ( waiverObj.agreed ) {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

}]);
