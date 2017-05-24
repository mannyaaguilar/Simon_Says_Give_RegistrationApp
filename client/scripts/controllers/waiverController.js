myApp.controller('WaiverController', ['$scope', '$http', '$location', 'VolunteerService', function($scope, $http, $location, VolunteerService) {

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

    var signature = $scope.waiverObj.nameBottomAdult;
    checkAdultSignFormat(signature);

    function checkAdultSignFormat(signature) {
      if (filledOut &&
          signature.charAt(0) === '/' &&
          signature.charAt(signature.length -1) === '/') {
            $location.path("/waiver-photo");
      }
      else if (filledOut &&
        (signature.charAt(0) !== '/' || signature.charAt(signature.length -1) !== '/' )) {
          $scope.message = 'Please put name between slashes';
        }
      else {
        $scope.message = 'Please fill out all highlighted fields';
      }
    } // end checkSignatureFormat
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

    var youthSignature = $scope.waiverObj.nameBottomYouth;
    var guardianSignature = $scope.waiverObj.guardianBottomYouth;
    var guardianEmail = $scope.waiverObj.guardianEmailYouth;

      if (filledOut &&
          youthSignature.charAt(0) === '/' &&
          youthSignature.charAt(youthSignature.length -1) === '/') {
            $location.path("/waiver-photo");
      }
      else if (filledOut &&
              (youthSignature.charAt(0) !== '/' || youthSignature.charAt(youthSignature.length -1) !== '/')) {
                $scope.message = 'Please put name between slashes';
               }
      else {
        $scope.message = 'Please fill out all highlighted fields';
      }

  }; // end submitYouthWaiver



  $scope.submitPhotoWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);






    if ( $scope.waiverObj.agreedPhoto )
    {
      $location.path("/confirmation");
    }
    else {
      $location.path("/override");
    }
  };

  $scope.declineWaiver = function() {
    $location.path("/override");
  };

}]); // end submitPhotoWaiver
