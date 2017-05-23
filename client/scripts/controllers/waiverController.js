myApp.controller('WaiverController', ['$scope', '$http', '$location', 'VolunteerService', function($scope, $http, $location, VolunteerService) {

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  // var todaysDate = new Date();
  //
  // VolunteerService.waiverObj = {
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

  $scope.submitAdultWaiver = function() {
    console.log("XXcurrent waiverObj: ", VolunteerService.waiverObj);
    var filledOut;

    filledOut = VolunteerService.waiverObj.dateTopAdult &&
                VolunteerService.waiverObj.nameTopAdult &&
                VolunteerService.waiverObj.agreedAdult &&
                VolunteerService.waiverObj.nameBottomAdult &&
                VolunteerService.waiverObj.dateBottomAdult;


    if ( filledOut ) {
      $location.path("/waiver-photo");
    }
    else {
      alert("Please complete all fields");
    }
  };

  $scope.submitYouthWaiver = function() {
    console.log("current waiverObj: ", VolunteerService.waiverObj);
    var noParentAll,
        parentAll,
        filledOut;

    noParentAll = VolunteerService.waiverObj.noParentYouth &&
                  VolunteerService.waiverObj.nameBottomYouth &&
                  VolunteerService.waiverObj.dateBottomVolYouth &&
                  VolunteerService.waiverObj.guardianEmailYouth;

    parentAll = VolunteerService.waiverObj.dateTopYouth &&
                VolunteerService.waiverObj.nameTopYouth &&
                VolunteerService.waiverObj.guardianTopYouth &&
                VolunteerService.waiverObj.agreedYouth &&
                VolunteerService.waiverObj.nameBottomYouth &&
                VolunteerService.waiverObj.dateBottomVolYouth &&
                VolunteerService.waiverObj.guardianBottomYouth &&
                VolunteerService.waiverObj.dateBottomGuardYouth;

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
    console.log("current waiverObj: ", VolunteerService.waiverObj);

    if ( VolunteerService.waiverObj.agreedPhoto ) {
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
