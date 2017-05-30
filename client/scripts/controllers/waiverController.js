myApp.controller('WaiverController', ['$window', '$scope', '$rootScope', '$anchorScroll', '$http', '$location', 'VolunteerService', function($window, $scope, $rootScope, $anchorScroll, $http, $location, VolunteerService) {

console.log("WaiverController loaded!");
    $scope.message = '';

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  // var todaysDate = new Date();
  //
  // $scope.waiverObj = {
  //   //Adult waiver
  //   volunteerIndex: "",
  //   dateTopAdult: todaysDate,
  //   nameTopAdult: "",
  //   agreedAdult: false,
  //   nameBottomAdult: "",
  //   dateBottomAdult: todaysDate,
  //   //Youth waiver
  //   dateTopYouth: todaysDate,
  //   nameTopYouth: "",
  //   agreedYouth: false,
  //   nameBottomYouth: "",
  //   dateBottomYouth: todaysDate,
  //   noParentYouth: "",
  //   dateBottomVolYouth: todaysDate,
  //   guardianEmailYouth: "",
  //   guardianTopYouth: "",
  //   guardianBottomYouth: "",
  //   dateBottomGuardYouth: todaysDate,
  //   //Photo waiver
  //   agreedPhoto: false,
  //   nameBottomPhoto: "",
  //   dateBottomPhoto: todaysDate,
  //   dateBottomVolPhoto: todaysDate,
  //   guardianBottomPhoto: "",
  //   dateBottomGuardPhoto: todaysDate
  // };

  $scope.waiverObj = VolunteerService.waiverObj;

  $scope.submitAdultWaiver = function() {
    console.log("XXcurrent waiverObj: ", $scope.waiverObj);
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

  }; // end submitAdultWaiver

  $scope.submitYouthWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
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

    if (filledOut) {
      $location.path('/waiver-photo');
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
                     $scope.waiverObj.agreedAdult &&
                     $scope.waiverObj.nameBottomPhoto;

    filledOutYouth = $scope.waiverObj.agreedPhoto &&
                     $scope.waiverObj.agreedYouth &&
                     $scope.waiverObj.nameBottomPhoto;

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
