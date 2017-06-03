myApp.controller('WaiverController', ['$window', '$scope', '$rootScope', '$anchorScroll', '$http', '$location', 'VolunteerService', function($window, $scope, $rootScope, $anchorScroll, $http, $location, VolunteerService) {

 $scope.currentURL = $location.$$absUrl + "/#signatures";
 

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

    if (filledOut) {
      $location.path('/waiver-photo');
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

    if ( filledOut ) {
       if ( noParentAll ) {
         $location.path("/override");
       }
       else if ( parentAll ) {
         $location.path("/waiver-photo");
       }
    }
    else {
      $scope.message = 'Please fill out all highlighted fields';
    }
  }; // end submitYouthWaiver

  $scope.submitPhotoWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    var filledOut;
    var filledOutAdult;
    var filledOutYouth;

    filledOutAdult = $scope.waiverObj.agreedPhoto &&
                     $scope.waiverObj.dateBottomPhoto &&
                     $scope.waiverObj.nameBottomPhoto;

    filledOutYouth = $scope.waiverObj.agreedPhoto &&
                     $scope.waiverObj.dateBottomVolPhoto &&
                     $scope.waiverObj.nameBottomPhoto &&
                     $scope.waiverObj.guardianBottomPhoto &&
                     $scope.waiverObj.dateBottomGuardPhoto;

    filledOut = filledOutAdult || filledOutYouth;

    if (filledOut) {
          $location.path('/confirmation');
    }
    else {
      $scope.message = 'Please fill out all highlighted fields';
    }

  }; // end submitPhotoWaiver

  $scope.declineWaiver = function() {
    $location.path("/override");
  };

}]); // end submitPhotoWaiver
