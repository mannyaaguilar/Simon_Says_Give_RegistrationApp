myApp.controller('WaiverController', ['$scope', '$http', '$location', 'VolunteerService', function($scope, $http, $location, VolunteerService) {

  $scope.message = '';

  $scope.waiverObj = VolunteerService.waiverObj;
  $scope.preregisteredVolunteerObj = VolunteerService.preregisteredVolunteerObj;

  $scope.submitAdultWaiver = function() {
    var filledOut;

    filledOut = $scope.waiverObj.dateTopAdult &&
                $scope.waiverObj.nameTopAdult &&
                $scope.waiverObj.agreedAdult &&
                $scope.waiverObj.nameBottomAdult &&
                $scope.waiverObj.dateBottomAdult;

    checkAdultSignFormat(filledOut);
  };

  checkAdultSignFormat = function(filledOut) {
    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      $scope.message = 'Please fill out all highlighted fields';
    }
  };

  $scope.submitYouthWaiver = function() {
    var noParentAll,
        parentAll,
        filledOut;

    noParentAll = $scope.waiverObj.noParentYouth &&
                  $scope.waiverObj.nameBottomYouth &&
                  $scope.waiverObj.dateBottomVolYouth &&
                  $scope.waiverObj.guardianEmailYouth;

    parentAll = $scope.waiverObj.dateTopYouth &&
                $scope.waiverObj.nameTopYouth &&
                $scope.waiverObj.guardianTopYouth &&
                $scope.waiverObj.agreedYouth &&
                $scope.waiverObj.nameBottomYouth &&
                $scope.waiverObj.dateBottomVolYouth &&
                $scope.waiverObj.guardianBottomYouth &&
                $scope.waiverObj.dateBottomGuardYouth;

    filledOut = noParentAll || parentAll;

    var youthSignature = $scope.waiverObj.nameBottomYouth;
    var guardianSignature = $scope.waiverObj.guardianBottomYouth;

    if ( filledOut ) {
      if ( noParentAll ) {
        $location.path("/override");
      }
      else if ( parentAll ) {
        $location.path("/waiver-photo");
      }
    }
    else {
      $scope.message = 'Please complete all highlighted fields';
    }
  };

  $scope.submitPhotoWaiver = function() {

    if ( $scope.waiverObj.agreedPhoto ) {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

  $scope.declineWaiver = function() {
    $location.path("/override");
  };

}]);
