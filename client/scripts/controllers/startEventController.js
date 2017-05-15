myApp.controller('startEventController', ['$scope', '$location', function($scope, $location) {
  $scope.code = {
    thisCode: ''
  };
  $scope.eventCode = function(code){
  console.log("Event Code button clicked", code.thisCode);
  $location.path('/checkInOut');
};
}]);
