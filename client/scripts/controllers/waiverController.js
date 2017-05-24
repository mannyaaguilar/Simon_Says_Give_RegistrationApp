myApp.controller('WaiverController', ['$scope', '$http', '$location',
  function($scope, $http, $location) {

    $scope.message = '';

  //ALL OF THESE WILL NEED TO BE IN A FACTORY

  let todaysDate = new Date();

  $scope.waiverObj = {
    //Adult waiver
    dateTopAdult: todaysDate,
    nameTopAdult: "",
    agreedAdult: false,
    nameBottomAdult: "",
    dateBottomAdult: todaysDate,
    //Youth waiver
    dateTopYouth: todaysDate,
    nameTopYouth: "",
    agreedYouth: false,
    nameBottomYouth: "",
    dateBottomYouth: todaysDate,
    noParentYouth: "",
    dateBottomVolYouth: todaysDate,
    guardianEmailYouth: "",
    guardianTopYouth: "",
    guardianBottomYouth: "",
    dateBottomGuardYouth: todaysDate,
    //Photo waiver
    agreedPhoto: false,
    nameBottomPhoto: "",
    dateBottomPhoto: todaysDate,
    dateBottomVolPhoto: todaysDate,
    guardianBottomPhoto: "",
    dateBottomGuardPhoto: todaysDate
  };

  //BEGIN TIMER STUFF
  let inDate;

  const NUM_MILIS_IN_HOUR = 3600000;
  $scope.setCheckIn = function() {
    inDate = new Date();
  };
  $scope.captureTime = function() {
    let newDate,
        inMonth,
        inDay,
        inYear,
        inHour,
        inMinute,
        prettyInDate,
        newMonth,
        newDay,
        newYear,
        newHour,
        newMinute,
        prettyNewDate,
        millisJustVolunteered,
        hoursJustVolunteered;

    console.log("inDate: ", inDate);
    inMonth = inDate.getMonth();
    inDay = inDate.getDate();
    inYear = inDate.getFullYear();
    inHour = inDate.getHours();
    inMinute = inDate.getMinutes();
    prettyInDate = inMonth + "/" + inDay + "/" + inYear +
      ", at " + inHour + ":" + inMinute;
    console.log("prettyInDate: ", prettyInDate);

    newDate = new Date();
    console.log("newDate: ", newDate);
    newMonth = newDate.getMonth();
    newDay = newDate.getDate();
    newYear = newDate.getFullYear();
    newHour = newDate.getHours();
    newMinute = newDate.getMinutes();
    prettyNewDate = newMonth + "/" + newDay + "/" + newYear +
      ", at " + newHour + ":" + newMinute;
    console.log("prettyNewDate: ", prettyNewDate);

    millisJustVolunteered = newDate - inDate;
    hoursJustVolunteered = millisJustVolunteered / NUM_MILIS_IN_HOUR;
    console.log("hoursJustVolunteered: ", hoursJustVolunteered);
  };
  //END TIMER STUFF

  $scope.submitAdultWaiver = function() {
    console.log("current waiverObj: ", $scope.waiverObj);
    let filledOut;

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
    let noParentAll,
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



    // NEEDS TO BE FINISHED
    // function checkYouthSignFormat(youthSignature, guardianSignature) {
    //   if (filledOut &&
    //       youthSignature.charAt(0) === '/' &&
    //       youthSignature.charAt(youthSignature.length -1) === '/') {
    //         $location.path("/override");
    //   }
    //   else if (filledOut &&
    //     (signature.charAt(0) !== '/' || signature.charAt(signature.length -1) !== '/' )) {
    //       $scope.message = 'Please put name between slashes';
    //     }
    //   else {
    //     $scope.message = 'Please fill out all highlighted fields';
    //   }
    // } // end checkSignatureFormat




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
  }; // end submitYouthWaiver

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
