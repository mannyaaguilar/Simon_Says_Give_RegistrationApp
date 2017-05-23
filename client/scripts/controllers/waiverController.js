myApp.controller('WaiverController', ['$scope', '$http', '$location', 'VolunteerService', function($scope, $http, $location, VolunteerService) {

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


    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      alert("Please complete all fields");
    }
  };

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

    if ( filledOut ) {
      if ( noParentAll ) {
        $location.path("/override");
      }
      else if ( parentAll ) {
        $location.path("/waiver-photo");
      }
      else {
        alert("Weird error!");
      }
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.submitPhotoWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);

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
